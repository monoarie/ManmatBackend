import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import gravatar from 'gravatar'
import normalize from 'normalize-url'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
      profile_img: {
        type: String,
      },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    try {
        const avatar = normalize(
            gravatar.url(this.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            }),
            { forceHttps: true }
        );

        this.profile_img = avatar;

        if (!this.isModified('password')) {
            next()
        }

        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        next(error)
    }

})

const User = mongoose.model('User', userSchema)

export default User
