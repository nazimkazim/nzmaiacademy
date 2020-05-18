import React from 'react'
import TextFieldGroup from '../common/TextFieldGroup';

export default (props) => {
  const {helper = {}, onChange, onRemove, onAddMore} = props;

  const {
    L1 = '',
    L2 = ''
  } = helper;

  const onChangeProperty = (propertyName, e) => {
    //copy current helper
    const data = {...helper};
    //change value by property name
    data[propertyName] = e.target.value;
    onChange(data);
  };

  return (
    <div>
      <TextFieldGroup
        placeholder="Book"
        info="type word in L1"
        name="L1"
        value={L1}
        onChange={onChangeProperty.bind(null, "L1")}
      />
      <TextFieldGroup
        placeholder="книга"
        info="type word in L2"
        name="L2"
        value={L2}
        onChange={onChangeProperty.bind(null, "L2")}
      />

      <input
        type="button"
        value="remove"
        className="button is-primary"
        onClick={onRemove}
      />
      <input
        type="button"
        value="add more"
        className="button is-primary"
        onClick={onAddMore}
      />
      <hr />
    </div>
  )
}