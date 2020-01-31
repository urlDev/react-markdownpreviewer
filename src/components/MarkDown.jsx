import React, { Component } from 'react';
import marked from 'marked';
import { Persist } from 'react-persist'

import './MarkDown.css';

// this is for line breaks, enters will be considered as br in preview
marked.setOptions({
	breaks: true
});

// value at first in editor
const placeHolder = `
# Hi!

## Welcome to my React previewer

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**
Or _italic_.
Or **_both!_**
And  ~~cross stuff out~~ if you want to.

There's also [links](https://codepen.io/bmansk14/), and
> Block Quotes

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)

`;

class MarkDown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: placeHolder
		};
	}

	handleChange = (e) => {
		this.setState({
			value: e.target.value
		});
	};

	render() {
		const { value } = this.state;

		return (
			<div className="container">
				<div className="editor">
                <h1 className="edit">editor</h1>
					<textarea name="textarea" id="editor" cols="90" rows="15" onChange={this.handleChange}>
						{value}
					</textarea>
				</div>
                <h1 className="pretext">preview</h1>
				<div className="preview">
					<div id="preview" dangerouslySetInnerHTML={{ __html: marked(value) }} />
				</div>
                <p className="url">by urlDev</p>
				<Persist 
          name="markdown" 
          data={this.state} 
          debounce={500} 
          onMount={data => this.setState(data)}
        />
			</div>
		);
	}
}

export default MarkDown;
