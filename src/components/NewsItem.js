import React, { Component } from 'react'

export class NewsItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let {title,description,imageurl,newsUrl,author,pubDate}=this.props;
        return (
            <>
                <div className="card my-3">
                    <img src={imageurl} className="card-img-top" alt={title} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p class="AuthDet">By {author?author:'unknown'} on {new Date(pubDate).toUTCString()}</p>
                        <a href={newsUrl} target="_blank" className="btn btn-primary btn-sm">Read More</a>
                    </div>
                </div>

            </>
        )
    }
}

export default NewsItem