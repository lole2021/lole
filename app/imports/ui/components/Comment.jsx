import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Feed } from 'semantic-ui-react';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Comment extends React.Component {
  render() {
    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <Feed.Date content={this.props.comment.createdAt.toLocaleDateString('en-US')} />
          </Feed.Summary>
          <Feed.Summary>
            {this.props.comment.comment}
          </Feed.Summary>
          <br/>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Comment);
