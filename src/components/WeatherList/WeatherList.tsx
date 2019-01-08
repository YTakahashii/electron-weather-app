import * as React from 'react';
import { List, Avatar } from 'antd';
import Weather from 'src/models/Weather';
import * as request from 'superagent';

interface WeatherListState {
	weathers: Weather[];
	isFetching: boolean;
}

export default class WeatherList extends React.Component<{}, WeatherListState> {

	constructor(props: {}) {
		super(props);
		this.state = {
			weathers: [],
			isFetching: false
		};
	}

	public componentWillMount() {
		this.setState({
			isFetching: true
		});

		request
			.get('https://api.openweathermap.org/data/2.5/forecast')
			.query({
				q: 'Hakodate',
				appid: process.env.REACT_APP_API_KEY
			})
			.then(response => response.body.list)
			.then((weathers: Weather[]) => {
				this.setState({
					weathers,
					isFetching: false
				});
				console.log(JSON.stringify(weathers));
			})
			.catch(error => {
				alert(error);
				this.setState({
					weathers: [],
					isFetching: false
				});
				console.log(error);
			});
	}

	private renderItem = (weather: Weather) => (
		<List.Item>
			<List.Item.Meta
				avatar={<Avatar src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} size="large" />}
				title={<div>
					<p>{weather.weather[0].main}</p>
					<h3>{this.kelvinToCelsius(weather.main.temp) + '°'}</h3>
				</div>
				}
				description={weather.dt_txt}
			/>
			<p style={{ marginRight: '3rem' }}>{`MAX: ${this.kelvinToCelsius(weather.main.temp_max)}°`}</p>
			<p style={{ marginRight: '3rem' }}>{`MIN: ${this.kelvinToCelsius(weather.main.temp_min)}°`}</p>
		</List.Item>
	);

	private kelvinToCelsius = (temp: number): number => Math.round(temp - 273.15);

	public render() {
		return (
			<div>
				{
					this.state.isFetching ? (
						<p>Loading</p>
					) :
					<List
						itemLayout="horizontal"
						dataSource={this.state.weathers}
						renderItem={this.renderItem}
					/>
				}
			</div>
		);
	}
}