import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

export default class CreateItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        largeImage: '',
        price: 0
    };

    handleChange = event => {
        const { name, type, value } = event.target;
        const val = type == 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    render() {
        return (
            <Form>
                <fieldset>
                    <label htmlFor="title">
                        Title
                        <input type="text" id="title" name="title" placeholder="Title" required onChange={this.handleChange} value={this.state.title} />
                    </label>

					<label htmlFor="price">
						Price
                        <input type="number" id="price" name="price" placeholder="Price" required onChange={this.handleChange} value={this.state.price} />
					</label>
                </fieldset>
            </Form>
        );
    }
}
