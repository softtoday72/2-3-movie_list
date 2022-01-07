const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')
//設定路由
//首頁
app.get('/', (req, res) => {

  res.render('index', { movies: movieList.results })
})
//分頁-單一電影介紹
app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: movie })
})
//搜尋頁
app.get('/search', (req, res) => {
  // console.log('req query=>', req.query.keyword)
  const keyword = req.query.keyword
  //如果keyword是空字串 '' , 所有字串都會包含空字串 , movies 會等於 movieList, 80個電影都會被包含進去
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  //右邊的movies是剛剛挑選出來的 , 左邊是index裡面的變數
  //大括號左右兩邊都相同時可以寫一個就好 ex下面可改成 { movies }
  res.render('index', { movies: movies, keyword: keyword })
})

//設定監聽器
app.listen(port, () => {
  console.log(`Express in listening on localhost:${port}`)
})
//引擎的設定
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
//引擎的指定
app.set('view engine', 'handlebars')
//設定靜態檔案(css & js & bootstrap)
app.use(express.static('public'))