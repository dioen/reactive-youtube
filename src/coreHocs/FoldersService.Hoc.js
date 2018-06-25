import React, { Component } from 'react';
import { FoldersService } from '../services/Folders.Service';

export const FoldersServiceHoc = InputComponent => {
    return class FoldersServiceHoc extends Component {
        constructor(props) {
            super(props);

            this.FoldersService = new FoldersService();
        }

        render = () => {
            return <InputComponent FoldersService={this.FoldersService} {...this.props} />
        }
    }
}
