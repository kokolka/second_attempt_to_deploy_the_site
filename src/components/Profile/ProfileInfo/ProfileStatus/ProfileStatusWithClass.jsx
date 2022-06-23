import React from 'react';
import s from './ProfileStatus.module.css';

class ProfileStatusWithClass extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activeEditMode = () => { 
        this.setState({
            editMode: true
        })
    }
    deactiveEditMode = () => {
        this.setState({ 
            editMode: false
        });
        this.props.putUserStatus(this.state.status);
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.target.value
        });
        // this.props.putUserStatus(e.target.value);
    }

    componentDidUpdate(prevProps){
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return (
            <div className={s.status_block}>
                {!this.state.editMode &&
                    <div>
                        <span
                            className={s.status_editModeOff}
                            onDoubleClick={this.activeEditMode}
                        >{this.props.status || 'No status'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            onChange={this.onStatusChange}
                            className={s.status_editModeOn}
                            autoFocus={true}
                            onBlur={this.deactiveEditMode}
                            value={this.state.status}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatusWithClass;