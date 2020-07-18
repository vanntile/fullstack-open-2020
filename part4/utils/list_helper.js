const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return Array.isArray(blogs) ? blogs.map((b) => b.likes).reduce((acc, c) => acc + c, 0) : 0
}

module.exports = {
  dummy,
  totalLikes,
}
