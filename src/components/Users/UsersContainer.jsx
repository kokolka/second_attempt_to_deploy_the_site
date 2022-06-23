import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { setCurrentPage, setTotalCount, getUsers,
    follow, unfollow } from '../../redux/users-reducer';
import { compose } from 'redux';
import {  getStateCurrentPage, getStateFollowingIsProgress, getStateIsFetching, 
    getStatePageSize, getStatePageTotalCount, getStateUsers } from '../../redux/users-selectors';
import { getSizeApp } from '../../redux/app-selectors';
import setNamePage from '../common/SetNamePage/setNamePage';

class UsersComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize); //thunk
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page);

        this.props.getUsers(page, this.props.pageSize); //thunk
    }

    render() {
        setNamePage('Users');
        return (
            <Users {...this.props}
                onPageChanged={this.onPageChanged}
            />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        users: getStateUsers(state),
        pageSize: getStatePageSize(state),
        pageTotalCount: getStatePageTotalCount(state),
        currentPage: getStateCurrentPage(state),
        isFetching: getStateIsFetching(state),
        followingIsProgress: getStateFollowingIsProgress(state),
        sizeApp: getSizeApp(state)
    }
}

export default compose(
    connect(mapStateToProps, {
        setCurrentPage,
        setTotalCount,
        getUsers,
        follow,
        unfollow
    })
)(UsersComponent)