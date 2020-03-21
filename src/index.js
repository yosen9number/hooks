import React, {Component, useCallback, useEffect, useState, useMemo} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, setValue] = useState(1);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button
                    onClick={() => setValue((v) => v + 1)}>+</button>
                <button
                    onClick={() => setVisible(false)}>hide</button>
                <PlanetInfo id={value} />
            </div>
        );
    } else {
        return <button onClick={() => setVisible(true)}>show</button>
    }
};

const getPlanet = (id) => {
    return  fetch(`https://swapi.co/api/planets/${id}`)
        .then(res => res.json())
        .then(data => data);
};

const useRequest = (request) => {
    const initialState = useMemo(() => ({
        data: null,
        loading: true,
        error: null
    }), []);
    const [dataState, setDataState] = useState(initialState);

    useEffect(() => {
        setDataState(initialState);


        let canselled = false;
        request()
            .then(data => !canselled && setDataState({
                data,
                loading: false,
                error: false
            }))
            .catch(error => !canselled && setDataState({
                data: null,
                loading: false,
                error
            }));
        return () => canselled = true;
    }, [request, initialState]);

    return dataState;
};

const usePlanetInfo = (id) => {
    const request = useCallback(() => getPlanet(id), [id]);
    return useRequest(request);
};


const PlanetInfo = ({id}) => {
    const {data, loading, error} = usePlanetInfo(id);

    if (error) {
        return <div>Something is worn</div>
    }
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div>{id} - {data.name}</div>
    );
};

const Notification = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timeout);
    }, []);

    return  (<div>
        {visible && <p>Hello</p>}
    </div>);
};

const HookCounter = ({value}) => {
    useEffect(() => {
        console.log('mount');
        return  console.log('unmount');
    }, []);
    useEffect(() => console.log('update'));
    useEffect(() => () => console.log('unmount'), []);
    return <p>{value}</p>
};

class ClassCounter extends Component {
    componentDidMount() {
        console.log('class: mount');
    }

    componentDidUpdate (props) {
        console.log('class: update');
    }

    componentWillUnmount () {
        console.log('class: unmount');
    }

    render () {
        return <p style={{opacity: 0.1}}>{this.props.value}</p>;
    }
}


ReactDOM.render(<App />, document.getElementById('root'));

