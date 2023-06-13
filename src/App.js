import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TagsItems from './components/TagsItems'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    textElement: '',
    selectElement: tagsList[0].displayText,
    newList: [],
    tag: '',
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {textElement, selectElement} = this.state
    if (textElement === '' && selectElement === 'Health') {
      this.setState({textElement: '', selectElement: tagsList[0].displayText})
    } else {
      const newItem = {
        id: uuidv4(),
        name: textElement,
        select: selectElement,
      }
      this.setState(prevState => ({
        newList: [...prevState.newList, newItem],
        textElement: '',
        selectElement: tagsList[0].displayText,
      }))
    }
  }

  onChangeInputElement = event => {
    this.setState({textElement: event.target.value})
  }

  onChangeSelectElement = event => {
    const {textElement} = this.state
    if (textElement !== '') {
      const item = tagsList.filter(each => each.optionId === event.target.value)
      this.setState({selectElement: item[0].displayText})
    }
  }

  onClickTag = id => {
    this.setState({tag: id})
  }

  render() {
    const {textElement, selectElement, newList, tag} = this.state
    console.log(selectElement)
    let displayList = newList
    if (tag !== '') {
      displayList = newList.filter(each => each.select === tag)
    }
    return (
      <div className="container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <h1 className="main-heading">Create a task!</h1>
          <label className="label" htmlFor="input">
            Task
          </label>
          <input
            type="text"
            id="input"
            placeholder="Enter the task here"
            className="input-element"
            value={textElement}
            onChange={this.onChangeInputElement}
          />
          <label className="label" htmlFor="select">
            Tags
          </label>
          <select
            id="select"
            className="input-element"
            onChange={this.onChangeSelectElement}
          >
            {tagsList.map(each => (
              <option value={each.optionId} key={each.optionId}>
                {each.displayText}
              </option>
            ))}
          </select>
          <button className="button" type="submit">
            Add Task
          </button>
        </form>
        <div className="task-container">
          <h1 className="heading">Tags</h1>
          <ul className="unordered-list">
            {tagsList.map(each => (
              <TagsItems
                each={each}
                key={each.optionId}
                onClickTag={this.onClickTag}
                tag={tag}
              />
            ))}
          </ul>
          <h1 className="heading">Tasks</h1>
          {displayList.length > 0 ? (
            <ul className="task-list-items">
              {displayList.map(each => (
                <li key={each.id} className="new-list">
                  <p className="para">{each.name}</p>
                  <p className="task-list-button">{each.select}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-task-container">
              <p className="no-task">No Tasks Added Yet</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
