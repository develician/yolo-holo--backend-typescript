import Account from '../../models/account';
import crypto from 'crypto';
import Joi from 'joi';
import { generateToken } from '../../lib/token';

const hash = (password: string): string => {
  const { SECRET_KEY } = process.env;
  if (SECRET_KEY === undefined) {
    return '';
  }
  return crypto
    .createHmac('sha256', SECRET_KEY)
    .update(password)
    .digest('hex');
};

const validatePassword = (password: string, userpassword: string): boolean => {
  const hashed = hash(password);
  return hashed === userpassword;
};

const register = async (ctx: any) => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(4)
      .max(15)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(6),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    console.log(result.error.details[0].message);
    ctx.status = 400; // Bad request
    ctx.body = {
      message: result.error.details[0].message,
    };
    return;
  }

  const { username, email, password } = ctx.request.body;

  try {
    let existing = await Account.findOne({
      $or: [{ 'profile.username': username }, { email }],
    }).exec();

    if (existing) {
      ctx.status = 409;
      ctx.body = {
        key: existing.email === email ? 'email' : 'username',
      };
      return;
    }
  } catch (e) {
    ctx.throw(e, 500);
  }

  try {
    let account = await new Account({
      profile: {
        username: username,
      },
      email: email,
      password: hash(password),
    });

    account.save();

    const payload = {
      _id: account._id,
      profile: account.profile,
    };

    let token = await generateToken(payload);
    ctx.status = 200;
    ctx.cookies.set('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    ctx.body = account.profile;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const login = async (ctx: any) => {
  console.log('accessed');
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    return;
  }

  const { email, password } = ctx.request.body;

  try {
    let account = await Account.findOne({
      $or: [{ 'profile.username': email }, { email }],
    }).exec();

    if (!account || !validatePassword(password, account.password)) {
      console.log('403');
      ctx.status = 403;
      return;
    }

    const tokenPayload = {
      _id: account._id,
      profile: account.profile,
    };

    let token = await generateToken(tokenPayload);
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    ctx.body = account.profile;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const logout = async (ctx: any) => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true,
  });
  ctx.body = {
    success: true,
  };
  ctx.status = 204;
};

const getProfile = async (ctx: any) => {
  const { username } = ctx.params;

  try {
    let account = await Account.findOne({
      'profile.username': username,
    }).exec();
    if (!account) {
      ctx.status = 404;
      return;
    }

    ctx.body = account.profile;
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const changePassword = async (ctx: any) => {
  const { username, password } = ctx.request.body;

  try {
    let account = await Account.findOne({
      'profile.username': username,
    }).exec();
    if (!account) {
      ctx.status = 404;
      return;
    }

    let updatedAccount = await Account.findByIdAndUpdate(
      account._id,
      {
        password: hash(password),
      },
      { new: true }
    ).exec();
    if (!updatedAccount) {
      ctx.status = 404;
      return;
    }
    ctx.body = updatedAccount.profile;
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const facebookAuth = async ctx => {
  console.log('accessed to facebook auth');
  const {
    fbToken,
    pictureUrl,
    fbEmail,
    fbId,
    fbName,
    socialKey,
  } = ctx.request.body;

  try {
    let existing = await Account.findOne({
      'profile.username': socialKey,
    }).exec();
    if (existing) {
      ctx.body = existing;
      ctx.status = 200;
      console.log('already existing');
      return;
    }

    let account = new Account({
      profile: {
        username: socialKey,
        thumbnail: pictureUrl,
      },
      email: fbEmail,
      social: {
        facebook: {
          id: fbId,
          accessToken: fbToken,
          displayName: fbName,
        },
      },
      password: 'facebook user',
    });
    account.save();
    ctx.body = account;
    ctx.status = 201;
    console.log('first register');
  } catch (e) {
    console.log(e);
    ctx.throw(e, 500);
  }
};

export default {
  register,
  login,
  logout,
  getProfile,
  changePassword,
  facebookAuth,
};
