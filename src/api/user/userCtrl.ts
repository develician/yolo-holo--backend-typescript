import Account from 'models/account';
const fs = require('fs');
const path = require('path');
const uploadDirPath = '../../../images';

const profile = async ctx => {
  const { username } = ctx.params;
  try {
    let account = await Account.findOne({
      $or: [{ 'profile.username': username }, { email: username }],
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

const changeProfileImage = async ctx => {
  const { username } = ctx.params;

  const file = ctx.request.files.profileImage;
  const storageFileName = Math.random().toString();

  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(
    path.join(__dirname + uploadDirPath, storageFileName + '.jpg')
  );
  reader.pipe(stream);
  console.log('uploading %s -> %s', file.name, stream.path);

  try {
    let account = await Account.findOne({
      'profile.username': username,
    }).exec();
    if (!account) {
      ctx.status = 404;
      return;
    }
    let id = account._id;

    let updatedAccount = await Account.findByIdAndUpdate(
      id,
      {
        'profile.thumbnail': `/static/images/${storageFileName}.jpg`,
      },
      { new: true }
    ).exec();
    console.log(updatedAccount);
  } catch (e) {
    ctx.throw(e, 500);
  }

  ctx.status = 201;
  ctx.body = {
    filename: storageFileName + '.jpg',
  };
};

export default { profile, changeProfileImage };
