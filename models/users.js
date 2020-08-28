const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const normalize = require('normalize-url');

const userSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        email : {
            type: String,
            required: true,
            // 독립성 보
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        }
    },
    {
        timestamps : true
    }
);

userSchema.pre('save', async function (next) {
    try {
        console.log('entered');

        const avatar = normalize(
            gravatar.url(this.email, {
                s: '200',
                r: 'pg',
                d: "mm"
            }),
            {forceHttps:true}
        );

        this.avatar = avatar;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;

        console.log('exited');
        next();

    } catch(error) {
        next(error)
    }
})


module.exports = mongoose.model('user', userSchema);
