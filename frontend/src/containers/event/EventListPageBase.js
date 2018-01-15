import React, {Component} from 'react';
import Pagination from '../common/Pagination';

import CommonLayout from '../../components/layout/CommonPage';
import EventListItem from '../../components/profile/EventListItem';
import Paper from 'material-ui/Paper';

class EventListPageBase extends Component {

    state = {
        events: null,
        eventsTotal: 0,
        page: 1
    };

    constructor(props, context)
    {
        super(props, context);
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState({
            events: nextProps.events,
            eventsTotal: nextProps.eventsTotal,
            page: nextProps.page
        });
    }

    getHeader()
    {
        return null
    }

    getFilter()
    {
        return null;
    }

    loadEvents()
    {


    }

    componentDidUpdate(prevProps, prevState)
    {
        console.log('componentDidUpdate', prevProps);

        if (this.needLoadEvents(prevProps)) {

            this.loadEvents();
        }
        else
        {
            window.scrollTo(0, 0);
        }
    }

    needLoadEvents(nextProps)
    {

    }


    componentDidMount()
    {
        console.log('componentDidMount');
        this.loadEvents();
    }

    render = () => {

        const { history, eventsPerPage } = this.props;
        const { events, eventsTotal, page } = this.state;

        return (
            <CommonLayout>
                {this.getHeader()}
                {this.getFilter()}

                <div className="profile-event-list">
                    {
                        !!events ?
                        (
                            events.length > 0 ?

                                events.map((event) => {
                                    return (<EventListItem key={event.id} event={event}/>)
                                })

                                :

                                    (<Paper>
                                        <div className="empty-content-container">
                                            <span className="message">No events there!</span>
                                        </div>
                                    </Paper>)

                        ):
                            null
                    }


                </div>

                <div>
                    <Pagination
                        urlParameterName="page"
                        history={history}
                        totalItems={eventsTotal}
                        currentPage={page}
                        itemsPerPage={eventsPerPage}
                    />
                </div>
            </CommonLayout>

        );
    }
}

EventListPageBase.propTypes = {};


export default EventListPageBase;