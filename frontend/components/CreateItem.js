import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION($title: String!, $description: String!, $price: Int!, $image: String, $largeImage: String) {
        createItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
            id
        }
    }
`;

export default class CreateItem extends Component {
    state = {
        title: 'Cool Shoes',
        description: 'I love those shoes',
        image: 'dog.jpg',
        largeImage: 'large-dog.jpg',
        price: 100
    };

    handleChange = event => {
        const { name, type, value } = event.target;
        const val = type == 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (
                    <Form
                        onSubmit={async e => {
                            // stop form from submitting
                            e.preventDefault();
                            // call the mutation
                            const res = await createItem();
                            // redirect to the single item page
                            Router.push({
                                pathname: '/item',
                                query: { id: res.data.createItem.id }
                            });
                        }}>
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="title">
                                Title
                                <input type="text" id="title" name="title" placeholder="Title" required onChange={this.handleChange} value={this.state.title} />
                            </label>

                            <label htmlFor="price">
                                Price
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="Price"
                                    required
                                    onChange={this.handleChange}
                                    value={this.state.price}
                                />
                            </label>

                            <label htmlFor="description">
                                Description
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Description"
                                    required
                                    onChange={this.handleChange}
                                    value={this.state.description}
                                />
                            </label>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export { CREATE_ITEM_MUTATION };
