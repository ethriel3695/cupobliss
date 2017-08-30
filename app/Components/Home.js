var React = require('react');
var Link = require('react-router-dom').Link;
var api = require('../utilities/api.js');

var xDown = null;
var yDown = null;
var direction = '';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            degreeVariation: 0
        }

        this.rotateImages = this.rotateImages.bind(this);
        this.updateImagesPosition = this.updateImagesPosition.bind(this);
        this.changeBackground = this.changeBackground.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
    }

    handleTouchStart (e) {
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
    }

    handleTouchMove (e) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                direction = 'right';
                this.rotateImages();
            } else {
                direction = 'left';
                this.rotateImages();
            }
        } else {
            if (yDiff > 0) {
                //console.log('up');
            } else {
                //console.log('down');
            }
        }

        xDown = null;
        yDown = null;
    }

    componentDidMount () {
        var defaultImage = document.getElementsByClassName('carouselImages pic0');
        defaultImage[0].dataset.first = 1
        this.updateImagesPosition(this.state.degreeVariation);
    }

    componentWillReceiveProps() {
        this.setState({
            degreeVariation: 0
        })
    }

    componentWillUpdate(nextProps, nextState) {
        this.updateImagesPosition(0);
    }

    changeBackground (image) {
        var actualImage = image.slice(22);
        api.fetchPictaculousObject(image);
        var actualImage = image.slice(22);
        api.fetchPictaculousObject(actualImage);
    }

    rotateImages(e) {
        var degreeModifier = 0;
        var classIdentifier = '';
        if (direction === '' || e !== undefined) {
            classIdentifier = e.target.className;
        }
        if (classIdentifier === 'moveLeft' || classIdentifier === 'moveRight') {
            direction = '';
        }
        if (classIdentifier === 'moveLeft' || direction === 'left') {
            degreeModifier = 60;
        }
        else if (classIdentifier === 'moveRight' || direction === 'right') {
            degreeModifier = -60;
        }
        this.setState({
            degreeVariation: this.state.degreeVariation + degreeModifier,
        }, function () {
            this.updateImagesPosition(this.state.degreeVariation);
        }.bind(this));
    }

    updateImagesPosition(currentPosition) {
        var carouselObject = document.getElementsByClassName("carouselContainer");
        carouselObject[0].style.transform = "rotateY(" + currentPosition + "deg)";
        carouselObject[0].style.webkitTransform = "rotateY(" + currentPosition + "deg)";
        carouselObject[0].style.mozTransform = "rotateY(" + currentPosition + "deg)";
        carouselObject[0].style.oTransform = "rotateY(" + currentPosition + "deg)";
    }

    render() {
        return (
            <div className='home-container'>
                <h1 className='header'>{this.props.user.name}</h1>
                <div className='imageContainer'>
                    <div className='carouselContainer'>
                    {this.props.user.images.map((image, index, front) => {
                        return (
                            <img className={'carouselImages pic' + index}
                                src={image} alt='This is alex'
                                data-first='0'
                                key={image + index} 
                                onTouchStart={this.handleTouchStart}
                                onTouchMove={this.handleTouchMove}/>
                        )
                    })}    
                    {this.props.user.imageCaption.map((caption, index) => {
                        return (
                            <figcaption className={'captionContainer pic' + index}
                            key={caption + index}>
                                {caption}
                            </figcaption>
                        )
                    })}       
                    </div>
                    <i className="moveRight"
                        onClick={this.rotateImages}></i>
                    <i className="moveLeft"
                        onClick={this.rotateImages}></i>
                </div>
            </div>
        )
    }
}

module.exports = Home;