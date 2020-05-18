import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getAllDialogues} from '../../actions/dialogue'


const Dialogues = ({getAllDialogues, dialogue:{dialogues,loading}}) => {
  useEffect(() => {
    getAllDialogues()
  }, [getAllDialogues])
  console.log(dialogues)
  return (
    <div>
        {loading ? <Spinner/> : (
          dialogues.map(dialogue => (
          <div>{dialogue.langPair}</div>
          ))
        )}
    </div>
  )
}

Dialogues.propTypes = {
  getAllDialogues:PropTypes.func.isRequired,
  dialogues:PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  dialogue:state.dialogue
})

export default connect(mapStateToProps, {getAllDialogues})(Dialogues)