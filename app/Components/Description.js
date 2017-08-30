var React = require('react');

class Description extends React.Component {

    render() {
        return (

            <div className='descriptionContainer'>
            <h1 className='descriptionHeader'>Why I love {this.props.user.name}</h1>
                <ul className='descriptionList'>
                {this.props.user.description.map((text) => {
                return (
                    <li className='descriptionItem' key={text}>
                        {text}
                    </li>
                )
                })}
                </ul>
            </div>
        )
    }
}

module.exports = Description;