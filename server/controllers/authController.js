require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const messageFunction = require('../utils/messageFunction')


// @desc     Register user
// @access   Public
const register = async (req, res) => {
      const { username, password, firstName, lastName, email } = req.body

      try {
            const existingUser = await User.findOne({ where: { username } })

            if (existingUser) {
                  return res
                        .status(403)
                        .json(
                              messageFunction(true, 'Username Already Exists')
                        )
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await User.create({
                  username,
                  password: hashedPassword,
                  firstName,
                  lastName,
                  email,
            })

            if (user) {
                  return res
                        .status(201)
                        .json(
                              messageFunction(
                                    false,
                                    'User Created',
                                    user
                              )
                        )
            } else {
                  return res
                        .status(403)
                        .json(
                              messageFunction(
                                    true, 'Failed to Create User')
                        )
            }
      } catch (error) {
            console.error(error.message)
            return res
                  .status(400)
                  .json(
                        messageFunction(true, 'Failed Adding User')
                  )
      }
}

// @desc     Signin for registered users
// @access   Public
const login = async (req, res) => {
      const { username, password } = req.body
      try {
            const user = await User.findOne({ where: { username } })

            if (!user || !await bcrypt.compare(password, user.password)) {
                  return res
                        .status(401)
                        .json(
                              messageFunction(true, 'Invalid credentials')
                        )
            }
            const payload = {
                  id: user.id,
                  username: user.username
            }

            jwt.sign(
                  payload,
                  process.env.JWT_SECRET,
                  {
                        expiresIn: '3h', // For 3 hours
                  },
                  (error, token) => {
                        if (error)
                              return res
                                    .status(401)
                                    .json(
                                          messageFunction(true, 'Unauthorized')
                                    )

                        return res
                              .status(200)
                              .json(
                                    messageFunction(
                                          false,
                                          `You've Logged in.`,
                                          {
                                                _id: payload.id,
                                                username,
                                                token
                                          }
                                    )
                              )
                  }
            )
      } catch (error) {
            console.error(error.message)
            return res
                  .status(500)
                  .json(
                        messageFunction(true, 'Failed Adding User')
                  )
      }
}

module.exports = { register, login }