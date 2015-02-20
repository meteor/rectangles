TwitterRectangle = React.createClass({
  render: function () {
    if (this.props.html) {
      return <div dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
    } else {
      return <div>
        <div>
          {"Configure your "}
          <a href="https://twitter.com/settings/widgets/new/">new Twitter widget</a>.
          When {"you're"} done, click on "Create widget". Then, copy and paste the HTML
          code:
        </div>

        <textarea style={{marginTop: "5px", marginBottom: "5px", width: "100%", height: "80px"}}></textarea>
        <button style={{width: "40px", height: "20px"}}
                onclick={this.configure.bind(this)}>
          Add!
        </button>
      </div>;
    }
  },

  // Turns out javascript in a script tag doesn't get eval'd automatically.
  evalJs: function () {
    var js = this.props.html.match(/<script>(.*)<\/script>/)[1];
    eval(js);
  },

  configure: function () {
  },

  componentDidMount: function () { this.evalJs(); },
  componentDidUpdate: function () { this.evalJs(); }
});
