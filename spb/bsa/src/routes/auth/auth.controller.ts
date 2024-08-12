async function login(req: Request, res: Response) {
  const { username, password } = req.body
  const user = await User.findOne({ where: { username } })
  if (user && (await user.checkPassword(password))) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
    res.json({ token })
  } else {
    res.sendStatus(401)
  }
}

export default { login }
