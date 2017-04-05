import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Panel, Button} from "react-bootstrap";
import Highlight from "react-syntax-highlight";
import Formfields from "react-form-fields";
import Cubify from "react-cubify";
//
import {fetchCubifyHtml} from "../actions/actions_cubify-landing";
import {fetchCubifyPropsexampleJs} from "../actions/actions_cubify-landing";
import {fetchCubifyMethodsexampleJs} from "../actions/actions_cubify-landing";
import {fetchCubifyPropsDemoexampleJson} from "../actions/actions_cubify-landing";
import {fetchCubifyCssDemoexampleCss} from "../actions/actions_cubify-landing";
import {fetchCubifyDeployexampleHtml} from "../actions/actions_cubify-landing";
//
import BackgroundCanvas from "../components/background-canvas";
import {updateState} from "../toolbox/toolbox";
import ReactGA from "react-ga";
//
class CubifyLanding extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getInitialState()
	{
		return({});
	}
	componentWillMount()
	{
		this.props.fetchCubifyHtml();
		this.props.fetchCubifyPropsexampleJs();
		this.props.fetchCubifyMethodsexampleJs();
		this.props.fetchCubifyPropsDemoexampleJson();
		this.props.fetchCubifyCssDemoexampleCss();
		this.props.fetchCubifyDeployexampleHtml();
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		let navigationSection
			= 0;
		//
		window.requestAnimationFrame(()=>
		{
			let updateNavigationState
				= scopeProxy.props.updateNavigationstateAction;
			let setViewLoaded
				= scopeProxy.props.setViewLoadedAction;
			let setLayoutMode
				= scopeProxy.props.setLayoutModeAction;
			//
			let setviewTimeout =
				setTimeout(function()
				{
					setViewLoaded(true);
					setLayoutMode("full");
					updateNavigationState(navigationSection);
				},
				500);
			//
		});
		updateState(scopeProxy,
		{
			"Ready":false
		});
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		let scopeProxy
			= this;
		//
		window.requestAnimationFrame(function()
		{
			if(scopeProxy.state !== undefined
			&& scopeProxy.state.Ready === false)
			{
				updateState(scopeProxy,
				{
					"Ready":true
				});
				document.getElementById("cubifyrows-input-field").value
				= "3";
				document.getElementById("cubifycolumns-input-field").value
				= "4";
				document.getElementById("cubifyperspective-input-field").value
				= "4000px";
				document.getElementById("cubifycrawl-input-field").value
				= "vertical";
				document.getElementById("cubifydisplace-input-field").value
				= "270deg";
				document.getElementById("cubifyStageeasing-input-field").value
				= "easeInOutQuad";
				document.getElementById("cubifyStageduration-input-field").value
				= "400ms";
				document.getElementById("cubifyStagedelay-input-field").value
				= "0ms";
				document.getElementById("cubifyReseteasing-input-field").value
				= "easeInOutQuad";
				document.getElementById("cubifyResetduration-input-field").value
				= "200ms";
				document.getElementById("cubifyResetdelay-input-field").value
				= "0ms";
			}
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let cubifyHtml
			= scopeProxy.props.html;
		let jsonReady
			= true;
		let profileReady
			= true;
		let cubifyPropsDemoExample
			= (scopeProxy.props.cubifyPropsexampleJs !== undefined
			&& scopeProxy.props.cubifyPropsexampleJs !== null)
			? scopeProxy.props.cubifyPropsexampleJs
			: "loading...";
		let cubifyMethodsDemoExample
			= (scopeProxy.props.cubifyMethodsexampleJs !== undefined
			&& scopeProxy.props.cubifyMethodsexampleJs !== null)
			? scopeProxy.props.cubifyMethodsexampleJs
			: "loading...";
		let cubifyPropsExample
			= (scopeProxy.props.cubifyPropsDemoexampleJson !== undefined
			&& scopeProxy.props.cubifyPropsDemoexampleJson !== null)
			? scopeProxy.props.cubifyPropsDemoexampleJson
			: "loading...";
		let cubifyCssDemoExample
			= (scopeProxy.props.cubifyCssDemoexampleCss !== undefined
			&& scopeProxy.props.cubifyCssDemoexampleCss !== null)
			? scopeProxy.props.cubifyCssDemoexampleCss
			: "loading...";
		let cubifyDeployExample
			= (scopeProxy.props.cubifyDeployexampleHtml !== undefined
			&& scopeProxy.props.cubifyDeployexampleHtml !== null)
			? scopeProxy.props.cubifyDeployexampleHtml
			: "loading...";
		//
		let cubifyrowsInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"number",
					"name":"cubifyrows-input",
					"id":"cubifyrows-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":""//scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let cubifycolumnsInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"number",
					"name":"cubifycolumns-input",
					"id":"cubifycolumns-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":""//scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let cubifyperspectiveInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"distance",
					"name":"cubifyperspective-input",
					"id":"cubifyperspective-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":""//scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let cubifycrawlInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"horizontal | vertical",
					"name":"cubifycrawl-input",
					"id":"cubifycrawl-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":""//scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let cubifydisplaceInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"degrees",
					"name":"cubifydisplace-input",
					"id":"cubifydisplace-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":""//scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let cubifyStageeasingInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"string | spring array",
					"name":"cubifyStageeasing-input",
					"id":"cubifyStageeasing-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":""//scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let cubifyStagedurationInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"milliseconds",
					"name":"cubifyStageduration-input",
					"id":"cubifyStageduration-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":""//scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let cubifyStagedelayInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"milliseconds",
					"name":"cubifyStagedelay-input",
					"id":"cubifyStagedelay-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":""//scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let cubifyReseteasingInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"string | spring array",
					"name":"cubifyReseteasing-input",
					"id":"cubifyReseteasing-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":""//scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let cubifyResetdurationInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"milliseconds",
					"name":"cubifyResetduration-input",
					"id":"cubifyResetduration-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":""//scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let cubifyResetdelayInputProfile =
			{
				"tag":"input",
				"validation":false,
				"errorMsg":"",
				"required":true,
				"attributes":
				{
					"type":"text",
					"placeholder":"milliseconds",
					"name":"cubifyResetdelay-input",
					"id":"cubifyResetdelay-input-field",
					"className":"sandbox-formfield-input"
				},
				"onChange":""//scopeProxy.updateSandboxProfile.bind(scopeProxy)
			}
		//
		let backgroundcanvasProfile =
			{
				"Background":
				{
					"Color":"rgba(245,245,255,1)"
				},
				"Watermark":
				{
					"Name":"cubify",
					"Image":"anvil-watermark-filtered_480x363.png"
				}
			}
		//
		let cubifywallpaperProfile =
			{
				"Portal":
				{
					"Rows":"3",
					"Columns":"4",
					"Perspective":"4000px",
					"Report":
					{
						"Ready":(event)=>
						{
							//console.log("----- portal ready:", event);
						},
						"Complete":(event)=>
						{
							//console.log("----- portal complete:", event);
						}
					}
				},
				"Action":
				{
					"Stage":
					{
						"Easing":"easeInOutQuad",
						"Duration":"400ms",
						"Delay":"0ms"
					},
					"Reset":
					{
						"Easing":"easeInOutQuad",
						"Duration":"200ms",
						"Delay":"0ms"
					},
					"Report":
					{
						"Start":(event)=>
						{
							//console.log("----- cube motion start:", event);
						},
						"Complete":(event)=>
						{
							//console.log("----- cube motion complete:", event);
						}
					},
					"Crawl":"vertical",
					"Displace":"270deg"
				}
			}
		//
		let sandboxProfile
			= _.has(scopeProxy, "state.Sandbox.Profile")
			? scopeProxy.state.Sandbox.Profile
			: cubifywallpaperProfile;
		//
		if(jsonReady === true
		&& profileReady === true)
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					<div id="wares-landing-content-conainer" ref="wareslandingcontent" className="wares-landing-content">
						<div id="ware-introduction-container" ref="wareintroduction" className="ware-introduction">
							<div id="ware-landing-html-container" ref="warelandinghtml" dangerouslySetInnerHTML={{"__html":cubifyHtml}} className="ware-landing-html"/>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Properties (props)" className="detail-heading">
								<Highlight lang="json" value={cubifyPropsExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Methods" className="detail-heading">
								<Highlight lang="js" value={"let cubifyexampleRef = this.refs.cubifyexample;"}/>
								<hr/>
								<Highlight lang="js" value={cubifyMethodsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Properties (props)" className="detail-heading">
								<Highlight lang="js" value={cubifyPropsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Styles (css)" className="detail-heading">
								<Highlight lang="css" value={cubifyCssDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={true} header="Deploy" className="detail-heading">
								<Highlight lang="jsx" value={"npm install react-cubify -s"}/>
								<hr/>
								<Highlight lang="js" value={"import Cubify from 'react-cubify';"}/>
								<hr/>
								<Highlight lang="html" value={cubifyDeployExample}/>
							</Panel>
						</div>
						<div id="cubify-showcase-container" ref="cubifyshowcase" className="cubify-showcase">
							<div id="cubify-heading-container" ref="cubifyheading" className="cubify-heading">
								<div id="cubify-heading-headline-container" ref="cubifyheadingheadline" className="cubify-heading-headline">
									Demo
								</div>
							</div>
							<hr/>
							<div id="cubify-sandbox-title-container" className="cubify-sandbox-title">Sandbox</div>
							<div id="cubify-sandbox-container" className="cubify-sandbox">
								<div id="cubify-sandbox-host-container" className="cubify-sandbox-host">
									<div id="cubify-demo-title-container" className="cubify-demo-title">Cubify Profile</div>
									<div id="cubify-profilefields-container" className="cubify-profilefields">
										<div id="profilefields-left-container" className="cubify-profilefields-column">
											<div id="profilecolumn-header-container" className="cubify-demo-title">Portal</div>
											<div id="profilefield-host-container" className="profilefield-host">
												<div id="profilefield-label-container" className="profilefield-label">rows</div>
												<Formfields {...cubifyrowsInputProfile}/>
											</div>
											<div id="profilefield-host-container" className="profilefield-host">
												<div id="profilefield-label-container" className="profilefield-label">columns</div>
												<Formfields {...cubifycolumnsInputProfile}/>
											</div>
											<div id="profilefield-host-container" className="profilefield-host">
												<div id="profilefield-label-container" className="profilefield-label">perspective</div>
												<Formfields {...cubifyperspectiveInputProfile}/>
											</div>
											<div id="profilefield-host-container" className="profilefield-host">
												<div id="profilefield-label-container" className="profilefield-label">crawl</div>
												<Formfields {...cubifycrawlInputProfile}/>
											</div>
											<div id="profilefield-host-container" className="profilefield-host">
												<div id="profilefield-label-container" className="profilefield-label">displace</div>
												<Formfields {...cubifydisplaceInputProfile}/>
											</div>
										</div>
										<div id="profilefields-left-container" className="cubify-profilefields-column">
											<div id="profilecolumn-header-container" className="cubify-demo-title">Stage</div>
											<div id="profilefield-host-container" className="profilefield-host">
												<div id="profilefield-label-container" className="profilefield-label">easing</div>
												<Formfields {...cubifyStageeasingInputProfile}/>
											</div>
											<div id="profilefield-host-container" className="profilefield-host">
												<div id="profilefield-label-container" className="profilefield-label">duration</div>
												<Formfields {...cubifyStagedurationInputProfile}/>
											</div>
											<div id="profilefield-host-container" className="profilefield-host">
												<div id="profilefield-label-container" className="profilefield-label">delay</div>
												<Formfields {...cubifyStagedelayInputProfile}/>
											</div>
										</div>
										<div id="profilefields-left-container" className="cubify-profilefields-column">
											<div id="profilecolumn-header-container" className="cubify-demo-title">Reset</div>
											<div id="profilefield-host-container" className="profilefield-host">
												<div id="profilefield-label-container" className="profilefield-label">easing</div>
												<Formfields {...cubifyReseteasingInputProfile}/>
											</div>
											<div id="profilefield-host-container" className="profilefield-host">
												<div id="profilefield-label-container" className="profilefield-label">duration</div>
												<Formfields {...cubifyResetdurationInputProfile}/>
											</div>
											<div id="profilefield-host-container" className="profilefield-host">
												<div id="profilefield-label-container" className="profilefield-label">delay</div>
												<Formfields {...cubifyResetdelayInputProfile}/>
											</div>
										</div>
										<div id="cubify-updatebutton-container" className="cubify-updatebutton">
											<Button className="cubify-activate-button" onClick={scopeProxy.updateSandboxProfile.bind(this)}>Update Profile</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div id="cubify-profilebutton-container" className="cubify-profilebutton">
							<Button className="cubify-activate-button" onClick={scopeProxy.applyCubify.bind(this)}>Apply Profile</Button>
						</div>
						<div id="cubify-wallpaper-container" className="cubify-wallpaper">
							<Cubify ref="cubifywallpaper" {...sandboxProfile}>
								<div id="cubify-frontpanel-container" className="cubify-frontpanel"></div>
								<div id="cubify-leftpanel-container" className="cubify-leftpanel"></div>
								<div id="cubify-backpanel-container" className="cubify-backpanel"></div>
								<div id="cubify-rightpanel-container" className="cubify-rightpanel"></div>
							</Cubify>
						</div>
					</div>
					<BackgroundCanvas ref="backgroundcanvas" {...backgroundcanvasProfile}/>
				</div>
			);
		}
		else
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					"Loading Cubify Content..."
				</div>
			);
		}
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	applyCubify()
	{
		let scopeProxy
			= this;
		let cubifywallpaperRef
			= scopeProxy.refs.cubifywallpaper;
		//
		ReactGA.event(
		{
		  "category":"cubify_action",
		  "action":"sandbox_apply_clicked",
		  "label":"cubify_apply"
		});
		cubifywallpaperRef.cubifyApply();
	}
	updateSandboxProfile()
	{
		let scopeProxy
			= this;
		let cubifywallpaperRef
			= scopeProxy.refs.cubifywallpaper;
		let cubifyPortalrows
			= parseInt(document.getElementById("cubifyrows-input-field").value);
		let cubifyPortalcolumns
			= parseInt(document.getElementById("cubifycolumns-input-field").value);
		let cubifyPortalperspective
			= document.getElementById("cubifyperspective-input-field").value;
		let cubifyPortalcrawl
			= document.getElementById("cubifycrawl-input-field").value;
		let cubifyCubedisplace
			= parseInt(document.getElementById("cubifydisplace-input-field").value);
		let cubifyStageeasing
			= document.getElementById("cubifyStageeasing-input-field").value;
		let cubifyStageduration
			= parseInt(document.getElementById("cubifyStageduration-input-field").value);
		let cubifyStagedelay
			= parseInt(document.getElementById("cubifyStagedelay-input-field").value);
		let cubifyReseteasing
			= document.getElementById("cubifyReseteasing-input-field").value;
		let cubifyResetduration
			= parseInt(document.getElementById("cubifyResetduration-input-field").value);
		let cubifyResetdelay
			= parseInt(document.getElementById("cubifyResetdelay-input-field").value);
		//
		let stageeasingRegExp
			= /\[([^)]+)\]/;
		let stageeasingValue
			= (stageeasingRegExp.exec(cubifyStageeasing) !== null)
			? stageeasingRegExp.exec(cubifyStageeasing)[1]
			: null;
		let stageeasingArray
			= (stageeasingValue !== null)
			? stageeasingValue.split(",")
			: [];
		let stageeasingSpringArray
			= (stageeasingArray.length === 2)
			? stageeasingArray
			: [];
		//
		let reseteasingRegExp
			= /\[([^)]+)\]/;
		let reseteasingValue
			= (reseteasingRegExp.exec(cubifyReseteasing) !== null)
			? reseteasingRegExp.exec(cubifyReseteasing)[1]
			: null;
		let reseteasingArray
			= (reseteasingValue !== null)
			? reseteasingValue.split(",")
			: [];
		let reseteasingSpringArray
			= (reseteasingArray.length === 2)
			? reseteasingArray
			: [];
		//
		let adjustedStageeasingSpringArray =
			stageeasingSpringArray.map((arrayItem)=>
			{
				return(parseFloat(arrayItem));
			});
		//
		let filteredStageEasing
			= (stageeasingSpringArray.length === 2)
			? adjustedStageeasingSpringArray
			: cubifyStageeasing;
		//
		let adjustedReseteasingSpringArray =
			reseteasingSpringArray.map((arrayItem)=>
			{
				return(parseFloat(arrayItem));
			});
		//
		let filteredResetEasing
			= (reseteasingSpringArray.length === 2)
			? adjustedReseteasingSpringArray
			: cubifyReseteasing;
		//
		if(_.has(scopeProxy, "state.Sandbox.Profile.Action.Stage"))
		{
			Object.assign(scopeProxy.state.Sandbox.Profile.Action.Stage,
			{
				"Easing":null
			});
		}
		if(_.has(scopeProxy, "state.Sandbox.Profile.Action.Reset"))
		{
			Object.assign(scopeProxy.state.Sandbox.Profile.Action.Reset,
			{
				"Easing":null
			});
		}
		updateState(scopeProxy,
		{
			"Sandbox":
			{
				"Profile":
				{
					"Portal":
					{
						"Rows":cubifyPortalrows,
						"Columns":cubifyPortalcolumns,
						"Perspective":cubifyPortalperspective,
						"Report":
						{
							"Ready":(event)=>
							{
								//console.log("----- portal ready:", event);
							},
							"Complete":(event)=>
							{
								//console.log("----- portal complete:", event);
							}
						}
					},
					"Action":
					{
						"Stage":
						{
							"Easing":filteredStageEasing,
							"Duration":cubifyStageduration,
							"Delay":cubifyStagedelay
						},
						"Reset":
						{
							"Easing":filteredResetEasing,
							"Duration":cubifyResetduration,
							"Delay":cubifyResetdelay
						},
						"Report":
						{
							"Start":(event)=>
							{
								//console.log("----- cube motion start:", event);
							},
							"Complete":(event)=>
							{
								//console.log("----- cube motion complete:", event);
							}
						},
						"Crawl":cubifyPortalcrawl,
						"Displace":cubifyCubedisplace
					}
				}
			}
		});
		ReactGA.event(
		{
		  "category":"cubify_action",
		  "action":"profile-update_clicked",
		  "label":"cubify_profile_update"
		});
		window.requestAnimationFrame(()=>
		{
			cubifywallpaperRef.generatePortalCubes();
		});
	}
}
// Map Redux state items to this.props properties
// each time the Redux state changes. When that
// happens, the render() function is called
// and the DOM is updated according to any
// changes that happened in this.props. Use this
// to retrieve values from the Redux state and
// place them in this.props.
function mapReduxstateToProps(reduxState)
{
	return(
	{
		"html":reduxState.cubifyReducer.html,
		"cubifyPropsexampleJs":reduxState.cubifyReducer.cubifyPropsexampleJs,
		"cubifyMethodsexampleJs":reduxState.cubifyReducer.cubifyMethodsexampleJs,
		"cubifyPropsDemoexampleJson":reduxState.cubifyReducer.cubifyPropsDemoexampleJson,
		"cubifyCssDemoexampleCss":reduxState.cubifyReducer.cubifyCssDemoexampleCss,
		"cubifyDeployexampleHtml":reduxState.cubifyReducer.cubifyDeployexampleHtml,
		"setViewLoadedAction":reduxState.mainReducer.setViewloadedAction,
		"setLayoutModeAction":reduxState.mainReducer.setLayoutmodeAction,
		"updateNavigationstateAction":reduxState.navigationReducer.updateNavigationstateAction
	});
}
// Map Redux action-creators to this.props properties
// when the component is initialized. This gives access
// to each action-creator to the component from within
// this.props so that actions can be dispatched. Use
// this to initially establish values in the Redux state.
export default connect(mapReduxstateToProps,
{
	"fetchCubifyHtml":fetchCubifyHtml,
	"fetchCubifyPropsexampleJs":fetchCubifyPropsexampleJs,
	"fetchCubifyMethodsexampleJs":fetchCubifyMethodsexampleJs,
	"fetchCubifyPropsDemoexampleJson":fetchCubifyPropsDemoexampleJson,
	"fetchCubifyCssDemoexampleCss":fetchCubifyCssDemoexampleCss,
	"fetchCubifyDeployexampleHtml":fetchCubifyDeployexampleHtml
})(CubifyLanding);