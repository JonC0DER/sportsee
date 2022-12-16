import React from 'react'
import PropTypes from 'prop-types';

function Greetings({firstName, lastName}) {
  return (
    <>
        <h1 className="hello">Bonjour &nbsp;
            <span className="red-name">
                {firstName} {lastName}
            </span>
        </h1>
        <p className='msg-progress'>Félicitation</p>
    </>
  )
}

Greetings.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string
}

export default Greetings