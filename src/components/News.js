import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    //getting props and passed to constructor
    constructor(props) {
        //it's necessary to pass props to super constructor in react,so passed to parent constructor 
        super(props);

        document.title = `News App- ${this.props.category}`;
        //setting intial state of this component
        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
    }

    updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        this.setState({
            loading: true
        })
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults
        })
    }

    handlePrevClick = async () => {
        console.log("prev click handled");
        /*
        //when user clicks previous button we'll pass page parameter from state and decrease it by 1 and we'll pass page size to url which we are getting from props
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=65da7d4b84504639b12760520c59e415&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
        console.log(url);

        //setting loading property to true while fetch is called
        this.setState({ loading: true });

        //fetching data from api
        let data = await fetch(url);

        //convert fetched data to json object
        let parsedData = await data.json();

        //resetting state and decrease page by one, passing fetched articles to state and set loading to false
        this.setState(
            {
                page: this.state.page - 1,
                articles: parsedData.articles,
                loading: false
            }
        )
        */
        this.setState({
            page: this.state.page - 1
        })
        this.updateNews();
    }

    handleNextClick = async () => {
        console.log("next click handled");
        /*if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pagesize)) {
            //int fetch url we'll increase page by one and giving page size
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=65da7d4b84504639b12760520c59e415&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
            console.log(url);

            //setting loading to true
            this.setState({ loading: true });

            //fetch request
            let data = await fetch(url);

            //parsing data to json
            let parsedData = await data.json();
        
            //decrease page counter by one passing fetched articles to state and setting loading to false
            this.setState(
                {
                    page: this.state.page + 1,
                    articles: parsedData.articles,
                    loading: false
                }
            )
        }
        else {
            // this.setState({ page: this.state.maxpage })
        }*/
        this.setState({
            page: this.state.page + 1
        })
        this.updateNews();
    }

    async componentDidMount() {
        this.updateNews();
        /*let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=65da7d4b84504639b12760520c59e415&page=1&pageSize=${this.props.pagesize}`;
        console.log(url);
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({loading:false});
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        // this.setState({ maxpage: this.state.totalResults / 20 })
        console.log(this.state);
        */
    }

    componentDidUpdate() {
        console.log("component updated(may state changed or modification in component)");
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        /*this.setState({
            loading: true
        })*/
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            loading: false,
            totalResults: parsedData.totalResults
        })
        console.log(this.state.articles);
    }

    render() {
        return (
            <>
                    <h2 className="text-center">
                        NewsApp Top Headlines In {this.props.category}
                    </h2>
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length != this.state.totalResults}
                        loader={this.hasMore&&<Spinner />}
                    >
                        {/* {this.state.loading && <Spinner />} */}
                        {/* <div></div> */}
                        <div className='container'>
                            <div className="row">
                                {this.state.articles.map((item) => {
                                    // let { tit, desc, imgurl, nwsurl } = item;
                                    return (
                                        <div className="col-md-4" key={item.url} >
                                            <NewsItem title={item.title ? item.title.slice(0, 45) + '...' : ''} description={item.description ? item.description.slice(0, 88) + '...' : ''} imageurl={item.urlToImage ? item.urlToImage : 'https://cdn.coingape.com/wp-content/uploads/2021/11/12101345/Ethereum-Bulls-vs-Bears.jpeg'} newsUrl={item.url ? item.url : ''} author={item.author} pubDate={item.publishedAt} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>

                    {/* <div className="container d-flex justify-content-between">
                        <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; prev</button>
                        <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pagesize)} className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
                    </div> */}
                
            </>
        )
    }
}

export default News