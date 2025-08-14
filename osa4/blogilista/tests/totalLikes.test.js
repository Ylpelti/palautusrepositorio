const assert = require('assert')
const { totalLikes } = require('../utils/list_helper')

// Small helper for running tests
function test(name, fn) {
  try {
    fn()
    console.log(`✅ ${name}`)
  } catch (err) {
    console.error(`❌ ${name}`)
    console.error(err)
  }
}

// --- TEST DATA ---
const emptyList = []

const listWithOneBlog = [
  {
    _id: '1',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com',
    likes: 5,
    __v: 0
  }
]

const listWithMultipleBlogs = [
  {
    _id: '1',
    title: 'First blog',
    author: 'Author A',
    url: 'http://example.com/1',
    likes: 7,
    __v: 0
  },
  {
    _id: '2',
    title: 'Second blog',
    author: 'Author B',
    url: 'http://example.com/2',
    likes: 5,
    __v: 0
  },
  {
    _id: '3',
    title: 'Third blog',
    author: 'Author C',
    url: 'http://example.com/3',
    likes: 12,
    __v: 0
  }
]

// --- TESTS ---
test('Empty list returns 0 likes', () => {
  assert.strictEqual(totalLikes(emptyList), 0)
})

test('List with one blog returns its like count', () => {
  assert.strictEqual(totalLikes(listWithOneBlog), 5)
})

test('List with multiple blogs returns the sum of likes', () => {
  assert.strictEqual(totalLikes(listWithMultipleBlogs), 24)
})
