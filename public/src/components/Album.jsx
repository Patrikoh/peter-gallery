import React, {Component} from 'react';
import DragScroll from 'react-dragscroll';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import {Field, reduxForm} from 'redux-form';

import PhotoContainer from '../containers/PhotoContainer.js';
import PhotoPopupContainer from '../containers/PhotoPopupContainer.js';
import PhotoFormContainer from '../containers/PhotoFormContainer.js';

const photo = '../photos/malaysia1.jpg';

class Album extends Component {

    filterPhotoList(list, filter) {
        if (!!filter) {
            let filteredList = [];
            list.map(item => {
                if (item.tags.includes(filter)) {
                    filteredList.push(item);
                }
            });
            return filteredList;
        } else {
            return list;
        }
    }

    splitPhotoList(list) {
        let leftColumn = [];
        let rightColumn = [];
        list.map((item, index) => {
            if (index % 2 === 0) {
                leftColumn.push(item);
            } else {
                rightColumn.push(item);
            }
        })
        return {leftColumn, rightColumn};
    }

    getPhotoCategories(photos) {
        let photoCategories = [];
        photos.map(photo => {
            photo.tags.map(tag => {
                if (!photoCategories.includes(tag)) {
                    photoCategories.push(tag);
                };
            });
        });
        return photoCategories;
    }

    render() {
        const {photos, filter} = this.props;
        const filteredPhotos = this.splitPhotoList(this.filterPhotoList(photos, filter));
        const photoCategories = this.getPhotoCategories(photos);
        console.log(photoCategories);

        return (
            <div>
                <div className="l-flex l-columns ">
                    <div className="l-flex--2 l-padding-right--big">
                        <Paper className="side-menu l-rows" zDepth={1}>
                            <PhotoFormContainer/>
                            <div className="l-rows">
                                <h2>Kategorier</h2>
                                {photoCategories.map(category => (
                                    <div className="l-flex cell">{category}</div>
                                ))}
                            </div>
                            <div className="l-rows">
                                <h2>Album</h2>
                                {photoCategories.map(category => (
                                    <div className="l-flex cell">{category}</div>
                                ))}
                            </div>
                        </Paper>
                    </div>
                    <div className="l-flex--8 l-margin-top--huge l-height--100-top l-overflow--scroll">
                        <div className="l-columns l-flex">
                            <div className="l-flex">
                                {filteredPhotos.leftColumn.map(photo => (<PhotoContainer align='left' photo={photo}/>))}
                            </div>
                            <div className="l-flex">
                                {filteredPhotos.rightColumn.map(photo => (<PhotoContainer align='right' photo={photo}/>))}
                            </div>
                        </div>

                    </div>
                    <div className="l-flex--2 l-padding-left--big">
                        <Paper className="side-menu" zDepth={1}></Paper>
                    </div>
                </div>
                {!!this.props.selectedPhoto
                    ? <PhotoPopupContainer/>
                    : null}
            </div>
        )
    }
}

export default Album;
