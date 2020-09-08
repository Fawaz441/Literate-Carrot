import React, { Component } from 'react'
import { Image, Item, Container, Segment, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios'
import { api_endpoint } from '../endpoints'


class BookList extends Component {
    componentDidMount(){
        this.handleFetchBooks();
    }
    state = {
        loading: false,
        error: null,
        books: []
    }

    handleFetchBooks = () => {
        this.setState({ loading: true })
        axios.get(api_endpoint)
            .then(res => {
                this.setState({ books: res.data, loading: false })
            })
            .catch(err => {
                this.setState({ loading: false, error: err })
            })
    }

    render() {
        const { loading, books, error } = this.state;
        return (
            <Container>
                {loading && <Segment>
                    <Dimmer active inverted>
                        <Loader size='mini'>Loading</Loader>
                    </Dimmer>
                </Segment>
                }
                <Item.Group>
                    {books.map(book => {
                        return <Item key={book.id}>
                            <Item.Image size='tiny' src={book.image} />

                            <Item.Content>
                                <Item.Header>{book.title}</Item.Header>
                                <Item.Meta>
                                    <span className='price'>&#8358;{book.price}</span>
                                    <span className='stay'>{book.author.name}</span>
                                </Item.Meta>
                            </Item.Content>
                        </Item>
                    })}

                </Item.Group>
            </Container>
        )
    }
}

export default BookList
