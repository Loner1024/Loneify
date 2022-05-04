import axios from 'axios'
import React, { ChangeEvent, Fragment, useState, useEffect } from 'react'

const App = () => {
  const [notes, setNotes] = useState<Array<any>>([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/notes').then((response) => {
      console.log('response :>> ', response)
      setNotes(response.data)
    })
  }, [])
  console.log('rander', notes.length, 'notes')

  const addNote = (event: React.FormEvent) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    axios.post('http://localhost:3001/notes', noteObject).then((response) => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
  }
  const notesToShow = showAll
    ? notes
    : notes.filter(
        ({ important }: { important: Boolean }) => important === true
      )

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id: number) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    axios.put(url, changedNote).then((response) => {
      setNotes(notes.map((note) => (note.id !== id ? note : response.data)))
    })
  }
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(
          ({
            id,
            content,
            important,
          }: {
            id: number
            content: string
            important: boolean
          }) => (
            <Note
              key={id}
              content={content}
              important={important}
              toggleImportance={() => toggleImportanceOf(id)}
            />
          )
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

const Note = ({
  content,
  important,
  toggleImportance,
}: {
  content: string
  important: boolean
  toggleImportance: any
}) => {
  const label = important ? 'make not important' : 'make important'

  return (
    <li>
      {content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default App
