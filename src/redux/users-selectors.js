export const getStateUsers = (state) => {
    return state.usersPage.users;
}

export const getStatePageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getStatePageTotalCount = (state) => {
    return state.usersPage.pageTotalCount;
}

export const getStateCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getStateIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getStateFollowingIsProgress = (state) => {
    return state.usersPage.followingIsProgress;
}