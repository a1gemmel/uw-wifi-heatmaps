# UW Wifi Heatmap

This is a leaflet map visualizing current wifi usage data at the University of Waterloo main campus. It's mostly built for use on my website, but I've made efforts to make it reasonably portable.

## Contributing

Want to contribute? Awesome! I've added some development scripts to make it easier to get up and running.

## Development Environment

### Initial setup

You must have npm and node installed to run the development environment.

1. Fork or clone the repo.

2. `npm install`.

3. `npm install -g http-server`

4. `npm run build`

### Running development server

`npm run start`

The test server will run at `http://localhost:8080`. The public folder will rebuild automatically as you make changes in the source directory (You still have to manually refresh the page).


## License

A browser-based map of the University of Waterloo campus with overlays indicating current wifi usage.
Copyright (C) 2016 Andrew Gemmel, Jack Forsyth

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
