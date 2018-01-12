import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Link, NavLink } from 'react-router-dom';


import * as ReactUltimatePagination from 'react-ultimate-pagination';

class Pagination extends Component {

    constructor(props, context)
    {
        super(props, context);

        this.onPageChangeHandler = this.onPageChangeHandler.bind(this);
        this.getPageUrl = this.getPageUrl.bind(this);
        this.Page = this.Page.bind(this);

        this.pagination = ReactUltimatePagination.createUltimatePagination({
            itemTypeToComponent: {
                'PAGE': this.Page,
                'ELLIPSIS': this.Ellipsis,
                'FIRST_PAGE_LINK': this.FirstPageLink,
                'PREVIOUS_PAGE_LINK': this.PreviousPageLink,
                'NEXT_PAGE_LINK': this.NextPageLink,
                'LAST_PAGE_LINK': this.LastPageLink
            },
            WrapperComponent: this.Wrapper
        });

    }

    getPageUrl(page)
    {
        //debugger
        const {history, urlParameterName} = this.props;

        let result = history.location.pathname;

        let search = history.location.search;
        if (search.indexOf('?') !== -1)
        {
            search = search.substr(1);
        }

        const parameterRegExp = new RegExp(urlParameterName + "=(\\d+)?", "g");
        if (parameterRegExp.test(search))
        {
            search = search.replace(parameterRegExp, urlParameterName + "=" + page);
        }
        else
        {
            search += "&" + urlParameterName + "=" + page;
        }

        result += '?' + search;

        return result;
    }

    onPageChangeHandler = (page) => {
        console.log(page);
    }

    Page(props) {
        if (props.isActive)
        {
            return (<Button disabled>{props.value}</Button>);
        }

        return <Button component={Link} to={this.getPageUrl(props.value)}>{props.value}</Button>;
    }

    Ellipsis(props) {
        return <button onClick={props.onClick}>...</button>
    }

    FirstPageLink(props) {
        return <button onClick={props.onClick}>First</button>
    }

    PreviousPageLink(props) {
        return <button onClick={props.onClick}>Previous</button>
    }

    NextPageLink(props) {
        return <button onClick={props.onClick}>Next</button>
    }

    LastPageLink(props) {
        return <button onClick={props.onClick}>Last</button>
    }

    Wrapper(props) {
        return <div className="pagination">{props.children}</div>
    }

    getPagination()
    {
        return this.pagination;
    }

    render = () => {


        const {totalItems, itemsPerPage, currentPage} = this.props;
        const totalPages = Math.ceil(totalItems / itemsPerPage);


        if (totalPages === 0)
        {
            return null;
        }

        const Paginator = this.getPagination();
        return (

                <Paginator
                    hideEllipsis={true}
                    hidePreviousAndNextPageLinks={true}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={this.onPageChangeHandler}
                    hideFirstAndLastPageLinks={true}
                />
            );
    }
}

Pagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    urlParameterName: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
};

export default Pagination;