import './index.css'

const TagsItems = props => {
  const {each, onClickTag, tag} = props
  const {displayText} = each
  const onClickButton = () => {
    onClickTag(displayText)
  }
  const styledButton =
    tag === displayText ? 'selected-button tag-button' : 'tag-button'
  return (
    <li className="list">
      <button className={styledButton} type="button" onClick={onClickButton}>
        {displayText}
      </button>
    </li>
  )
}

export default TagsItems
