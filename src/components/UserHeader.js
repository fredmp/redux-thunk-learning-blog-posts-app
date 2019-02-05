import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class UserHeader extends React.Component {
  componentDidMount() {
    const { userId, fetchUser } = this.props;
    fetchUser(userId);
  }

  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return <div className="header">{user.name}</div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(u => u.id === ownProps.userId) };
}

export default connect(mapStateToProps, { fetchUser })(UserHeader);
