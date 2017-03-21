import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import {VelocityComponent, VelocityTransitionGroup, velocityHelpers} from "velocity-react";
import {VelocityAnimate, VelocityUi} from "velocity-animate";
import _ from "lodash";
//
//*************************
//*************************
// Nonpublished Imports
//
function updateState(ScopeProxy, Parcel)
{
	let existingState
		= (ScopeProxy.state !== null)
		? _.cloneDeep(ScopeProxy.state)
		: {};
	let adjustedState
		= _.merge(existingState, _.cloneDeep(Parcel));
	//
	try
	{
		ScopeProxy.setState(adjustedState);
	}
	catch(event)
	{
		console.warn("::react-cubify:problem::updateState:", event);
	}
}
//
//*************************
//*************************
// Exports
//
export default class Cubify extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getChildContext()
	{
		// empty
	}
	getInitialState()
	{
		return({});
	}
	componentWillMount()
	{
		// empty
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		//
		scopeProxy.setState(
		{
			"Active":false,
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
		window.requestAnimationFrame(()=>
		{
			if(scopeProxy.state !== null
			&& scopeProxy.state !== undefined
			&& scopeProxy.state.Ready === false)
			{
				let cubifyState =
					{
						"Ready":true
					}
				//
				updateState(scopeProxy, cubifyState);
				//
				window.requestAnimationFrame(()=>
				{
					scopeProxy.generatePortalCubes();
				});
				scopeProxy.props.Portal.Report.Ready(scopeProxy.props.children);
			}
		});
	}
	render()
	{
		let scopeProxy
			= this;
		let portalPerspective
			= scopeProxy.props.Portal.Perspective;
		let portalActive
			= _.has(scopeProxy, "state.Active")
			? scopeProxy.state.Active
			: false;
		let childIndex
			= _.has(scopeProxy, "state.Portal.Face.Index")
			? parseInt(scopeProxy.state.Portal.Face.Index) - 1
			: 0;
		let portalCubes
			= _.has(scopeProxy, "state.Portal.Cubes.Elements")
			? scopeProxy.state.Portal.Cubes.Elements
			: null;
		let portalcubeLocation
			= _.has(scopeProxy, "state.Portal.Cubes.Profiles.Reposition.Location")
			? scopeProxy.state.Portal.Cubes.Profiles.Reposition.Location
			: null;
		let wallpaperVisibility
			= (portalActive === true)
			? "hidden"
			: "visible";
		let wallpaperOpacity
			= (portalActive === true)
			? 0
			: 1;
		//
		let portalwallpaperStyle =
			{
				"display":"inline-block",
				"position":"absolute",
				"opacity":wallpaperOpacity,
				"visibility":wallpaperVisibility,
				"width":"100%",
				"height":"100%"
			}
		//
		let cubifyportalStyle =
			{
				"display":"inline-block",
				"position":"relative",
				"width":"100%",
				"height":"100%",
				"perspective":portalPerspective
			}
		//
		let repositioncubeStyle =
			{
				"position":"absolute",
				"visibility":"hidden",
				"opacity":0,
				"width":0,
				"height":0
			}
		//
		let repositioncubeProfileOnMount =
			{
				"runOnMount":false
			}
		//
		let repositioncubeProfile
			= _.has(scopeProxy, "state.Portal.Cubes.Profiles.Reposition.".concat(portalcubeLocation, ".Profile"))
			? scopeProxy.state.Portal.Cubes.Profiles.Reposition[portalcubeLocation].Profile
			: repositioncubeProfileOnMount;
		//
		if(_.has(scopeProxy, "state.Portal.Cubes.Elements"))
		{
			var portalVelocitynodes =
				scopeProxy.state.Portal.Cubes.Elements.map((elementItem)=>
				{
					let elementLocation
						= elementItem.props.id.split("_")[1];
					let repositioncubeProfile
						= _.has(scopeProxy, "state.Portal.Cubes.Profiles.Reposition.".concat(elementLocation))
						? scopeProxy.state.Portal.Cubes.Profiles.Reposition[elementLocation].Profile
						: null;
					//
					let portalcubeVelocity =
						<VelocityComponent {...repositioncubeProfile}>
							<div id="reposition-cube-container" style={repositioncubeStyle}></div>
						</VelocityComponent>
					//
					return(portalcubeVelocity);
				});
			//
		}
		else
		{
			var portalVelocitynodes
				= null;
		}
		return(
			<div id="cubify-portal-container" style={cubifyportalStyle}>
				<div id="portal-wallpaper-container" style={portalwallpaperStyle}>
					{scopeProxy.props.children[childIndex]}
				</div>
				{portalCubes}
				{portalVelocitynodes}
			</div>
		);
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	generatePortalCubes()
	{
		let scopeProxy
			= this;
		let portalElement
			= document.getElementById("cubify-portal-container");
		let initialFaceIndex
			= _.has(scopeProxy, "state.Portal.Face.Index")
			? scopeProxy.state.Portal.Face.Index
			: 1;
		let portalWidth
			= (portalElement !== null)
			? portalElement.offsetWidth
			: null;
		let portalHeight
			= (portalElement !== null)
			? portalElement.offsetHeight
			: null;
		let totalCuberows
			= parseInt(scopeProxy.props.Portal.Rows);
		let totalCubecolumns
			= parseInt(scopeProxy.props.Portal.Columns);
		let maskrectX
			= 0;
		let maskrectY
			= 0;
		let cubeZindex
			= 10000;
		let clippathWidth
			= (portalWidth !== null)
			? portalWidth / totalCubecolumns
			: 0;
		let clippathHeight
			= (portalHeight !== null)
			? portalHeight / totalCuberows
			: 0;
		let clippathId
			= null;
		let maskrectWidth
			= clippathWidth;
		let maskrectHeight
			= clippathHeight;
		let totalPortalcubes
			= totalCuberows * totalCubecolumns;
		let cubeRowcount
			= 0;
		let cubeColumncount
			= 0;
		let portalcubeCount
			= 0;
		let portalCubeMatrix
			= [];
		let portalcubeProfiles
			= [];
		//
		let cubifymaskSVGStyle =
			{
				"display":"inline-block",
				"position":"absolute",
				"width":maskrectWidth.toString().concat("px"),
				"height":maskrectHeight.toString().concat("px")
			}
		//
		let maskrectStyle =
			{
				"fill":"#ffffff",
				"stroke":"none"
			}
		//
		this.props.children.map((childItem)=>
		{
			childItem.props.style
			= (childItem.props.style === undefined)
			? {}
			: childItem.props.style;
		});
		let cubefacefrontChild
			= [];
		let cubefaceleftChild
			= [];
		let cubefacerightChild
			= [];
		let cubefacebackChild
			= [];
		//
		let portalCubes =
			()=>
			{
				for(var cubeRowcount = 0; cubeRowcount < totalCuberows; cubeRowcount++)
				{
					for(var cubeColumncount = 0; cubeColumncount < totalCubecolumns; cubeColumncount++)
					{
						let portalcubeLocation
							= "r".concat(cubeRowcount.toString(), "c", cubeColumncount.toString());
						let portalcubeId
							= "portalcube-container_".concat(portalcubeLocation);
						//
						let cubifyFrontchildId
							= "cubify-frontchild-container_".concat(portalcubeLocation);
						let cubifyLeftchildId
							= "cubify-leftchild-container_".concat(portalcubeLocation);
						let cubifyRightchildId
							= "cubify-rightchild-container_".concat(portalcubeLocation);
						let cubifyBackchildId
							= "cubify-backchild-container_".concat(portalcubeLocation);
						//
						let portalcubeFrontId
							= "portalcube-container_".concat(portalcubeLocation, "_front");
						let portalcubeLeftId
							= "portalcube-container_".concat(portalcubeLocation, "_left");
						let portalcubeRightId
							= "portalcube-container_".concat(portalcubeLocation, "_right");
						let portalcubeBackId
							= "portalcube-container_".concat(portalcubeLocation, "_back");
						//
						let cubifymaskFrontId
							= "cubify-mask_".concat(portalcubeLocation, "_front");
						let cubifymaskLeftId
							= "cubify-mask_".concat(portalcubeLocation, "_left");
						let cubifymaskRightId
							= "cubify-mask_".concat(portalcubeLocation, "_right");
						let cubifymaskBackId
							= "cubify-mask_".concat(portalcubeLocation, "_back");
						//
						let cubifyChildren =
							React.Children.map(scopeProxy.props.children, (cubifyChild)=>
							{
								return(React.cloneElement(cubifyChild));
							});
						//
						cubefacefrontChild.push(cubifyChildren[0]);
						cubefaceleftChild.push(cubifyChildren[1]);
						cubefacebackChild.push(cubifyChildren[2]);
						cubefacerightChild.push(cubifyChildren[3]);
						//
						let portalcubeOffsetH
							= parseFloat(maskrectWidth / 2)
							+ parseFloat(maskrectX);
						let cubefaceOffsetH
							= parseFloat(maskrectWidth)
							+ parseFloat(maskrectX);
						let portalcubeOffsetV
							= parseFloat(maskrectHeight / 2)
							+ parseFloat(maskrectY);
						let cubefaceOffsetV
							= parseFloat(maskrectHeight)
							+ parseFloat(maskrectY);
						//
						let portalcubeStyle =
							{
								"position":"absolute",
								"width":"100%",
								"transform-style":"preserve-3d",
								"transform-origin":portalcubeOffsetH.toString().concat("px ",portalcubeOffsetV.toString(), "px -", parseFloat(maskrectWidth / 2).toString(), "px"),
								"transform":"rotateY(0deg)",
								"zIndex":cubeZindex
							}
						//
						let cubfacefrontStyle =
							{
								"position":"absolute",
								"visibility":"visible",
								"top":"0",
								"left":"0",
								"width":"100%",
								"transform-origin":"0 0 0",
								"transform":"rotateY(0deg) translateX(0px)"
							}
						//
						let cubfaceleftStyle =
							{
								"position":"absolute",
								"visibility":"hidden",
								"top":"0",
								"left":"0",
								"width":"100%",
								"transform-origin":cubefaceOffsetH.toString().concat("px 0 0"),
								"transform":"translateX(-".concat(parseFloat(maskrectWidth).toString(), "px) rotateY(-90deg)")
							}
						//
						let cubfacerightStyle =
							{
								"position":"absolute",
								"visibility":"hidden",
								"top":"0",
								"left":"0",
								"width":"100%",
								"transform-origin":parseFloat(maskrectX).toString().concat("px 0 0"),
								"transform":"translateX(".concat(parseFloat(maskrectWidth).toString(), "px) rotateY(90deg)")
							}
						//
						let cubfacebackStyle =
							{
								"position":"absolute",
								"visibility":"hidden",
								"top":"0",
								"left":"0",
								"width":"100%",
								"transform-origin":parseFloat(maskrectX).toString().concat("px 0 0"),
								"transform":"translateX(".concat(parseFloat(maskrectWidth).toString(), "px) translateZ(-", parseFloat(maskrectWidth).toString(), "px) rotateY(180deg)")
							}
						//
						Object.assign(cubefacefrontChild[portalcubeCount].props,
						{
							"id":cubifyFrontchildId
						});
						Object.assign(cubefaceleftChild[portalcubeCount].props,
						{
							"id":cubifyLeftchildId
						});
						Object.assign(cubefacerightChild[portalcubeCount].props,
						{
							"id":cubifyRightchildId
						});
						Object.assign(cubefacebackChild[portalcubeCount].props,
						{
							"id":cubifyBackchildId
						});
						// For reasons yet to be understood, setting the clip-path
						// here does not work as expected. All clip-path style property
						// values will be set to the value of the last clip-path value
						// in the iteration. The values of the clip-path property are
						// set in componentDidUpdate().
						/*
						Object.assign(cubefacefrontChild[portalcubeCount].props.style,
						{
							"clip-path":"url(#".concat(cubifymaskFrontId, ")")
						});
						Object.assign(cubefaceleftChild[portalcubeCount].props.style,
						{
							"clip-path":"url(#".concat(cubifymaskLeftId, ")")
						});
						Object.assign(cubefacerightChild[portalcubeCount].props.style,
						{
							"clip-path":"url(#".concat(cubifymaskRightId, ")")
						});
						Object.assign(cubefacebackChild[portalcubeCount].props.style,
						{
							"clip-path":"url(#".concat(cubifymaskBackId, ")")
						});
						*/
						//
						let portalCube =
							<div id={portalcubeId} style={portalcubeStyle}>
								<div id={portalcubeFrontId} stare="forward" style={cubfacefrontStyle}>
									<svg style={cubifymaskSVGStyle}>
										<defs>
											<clipPath id={cubifymaskFrontId} x="0" y="0" width={clippathWidth} height={clippathHeight}>
												<rect x={maskrectX} y={maskrectY} width={maskrectWidth} height={maskrectHeight} style={maskrectStyle}/>
											</clipPath>
										</defs>
									</svg>
									{cubefacefrontChild[portalcubeCount]}
								</div>
								<div id={portalcubeLeftId} stare="left" style={cubfaceleftStyle}>
									<svg style={cubifymaskSVGStyle}>
										<defs>
											<clipPath id={cubifymaskLeftId} x="0" y="0" width={clippathWidth} height={clippathHeight}>
												<rect x={maskrectX} y={maskrectY} width={maskrectWidth} height={maskrectHeight} style={maskrectStyle}/>
											</clipPath>
										</defs>
									</svg>
									{cubefaceleftChild[portalcubeCount]}
								</div>
								<div id={portalcubeRightId} stare="right" style={cubfacerightStyle}>
									<svg style={cubifymaskSVGStyle}>
										<defs>
											<clipPath id={cubifymaskRightId} x="0" y="0" width={clippathWidth} height={clippathHeight}>
												<rect x={maskrectX} y={maskrectY} width={maskrectWidth} height={maskrectHeight} style={maskrectStyle}/>
											</clipPath>
										</defs>
									</svg>
									{cubefacerightChild[portalcubeCount]}
								</div>
								<div id={portalcubeBackId} stare="behind" style={cubfacebackStyle}>
									<svg style={cubifymaskSVGStyle}>
										<defs>
											<clipPath id={cubifymaskBackId} x="0" y="0" width={clippathWidth} height={clippathHeight}>
												<rect x={maskrectX} y={maskrectY} width={maskrectWidth} height={maskrectHeight} style={maskrectStyle}/>
											</clipPath>
										</defs>
									</svg>
									{cubefacebackChild[portalcubeCount]}
								</div>
							</div>
						//
						portalCubeMatrix.push(_.clone(portalCube));
						//
						maskrectX
						+= maskrectWidth;
						//
						portalcubeCount++;
						//
						cubeZindex--;
					}
					maskrectY
					+= maskrectHeight;
					//
					maskrectX
					= 0;
				}
				return(portalCubeMatrix);
			}
		//
		let portalcubeCollection
			= portalCubes();
		//
		scopeProxy.setState(
		{
			"Ready":true,
			"Active":false,
			"Portal":
			{
				"Cubes":
				{
					"Total":totalPortalcubes,
					"Elements":portalcubeCollection
				},
				"Rows":totalCuberows,
				"Columns":totalCubecolumns,
				"Focus":
				{
					"Row":-1,
					"Column":-1
				}
			}
		});
		window.requestAnimationFrame(()=>
		{
			scopeProxy.generateClipPaths();
		});
	}
	generateClipPaths()
	{
		let scopeProxy
			= this;
		let totalCuberows
			= scopeProxy.state.Portal.Rows;
		let totalCubecolumns
			= scopeProxy.state.Portal.Columns;
		//
		// Updating the clipPath style property does not seem to work
		// iteratively by operating on props.children before
		// rendering props.children to the DOM. The style property for clipPath
		// must be modified after the child node has been rendered
		// to the DOM. Several attempts were made to clone the children
		// and modify the style property (React.Children.map) as each
		// child item was iterated over. All of the children always
		// adopted the last style value of the iteration. I was unable
		// to identify the reason. A unique style name is needed for each
		// clipPath so as to identify the correct svg clipPath element
		// that is associated with the portalCube screen location.
		for(var rowCount = 0; rowCount < totalCuberows; rowCount++)
		{
			for(var columnCount = 0; columnCount < totalCubecolumns; columnCount++)
			{
				let cubePosition
					= "r".concat(rowCount.toString(), "c", columnCount.toString());
				//
				let frontchildId
					= "cubify-frontchild-container_".concat(cubePosition);
				let leftchildId
					= "cubify-leftchild-container_".concat(cubePosition);
				let rightchildId
					= "cubify-rightchild-container_".concat(cubePosition);
				let backchildId
					= "cubify-backchild-container_".concat(cubePosition);
				//
				let frontmaskClippathStyle
					= "url('#cubify-mask_".concat(cubePosition, "_front')");
				let leftmaskClippathStyle
					= "url('#cubify-mask_".concat(cubePosition, "_left')");
				let rightmaskClippathStyle
					= "url('#cubify-mask_".concat(cubePosition, "_right')");
				let backmaskClippathStyle
					= "url('#cubify-mask_".concat(cubePosition, "_back')");
				//
				let frontcubeElement
					= document.getElementById(frontchildId);
				let leftcubeElement
					= document.getElementById(leftchildId);
				let rightcubeElement
					= document.getElementById(rightchildId);
				let backcubeElement
					= document.getElementById(backchildId);
				//
				frontcubeElement.style.clipPath
				= frontmaskClippathStyle;
				leftcubeElement.style.clipPath
				= leftmaskClippathStyle;
				rightcubeElement.style.clipPath
				= rightmaskClippathStyle;
				backcubeElement.style.clipPath
				= backmaskClippathStyle;
			}
		}
	}
	cubifyApply()
	{
		let scopeProxy
			= this;
		//
		updateState(scopeProxy,
		{
			"Active":true
		});
		window.requestAnimationFrame(()=>
		{
			scopeProxy.activatePortalCubes();
		});
	}
	activatePortalCubes()
	{
		let scopeProxy
			= this;
		let totalCubifyrows
			= scopeProxy.state.Portal.Rows;
		let totalCubifycolumns
			= scopeProxy.state.Portal.Columns;
		let cubeLocation
			= scopeProxy.state.Portal.Focus;
		let cubifyRowIndex
			= cubeLocation.Row;
		let cubifyColumnIndex
			= cubeLocation.Column;
		let crawlDirection
			= scopeProxy.props.Action.Crawl;
		//
		if(crawlDirection === "vertical")
		{
			if(cubifyRowIndex === -1
			&& cubifyColumnIndex === -1)
			{
				cubifyRowIndex
				= 0;
				cubifyColumnIndex
				= 0;
			}
			else if(cubifyColumnIndex >= (totalCubifycolumns - 1))
			{
				cubifyColumnIndex
				= 0;
				//
				cubifyRowIndex++;
			}
			else
			{
				cubifyColumnIndex++;
			}
			if(cubifyRowIndex < totalCubifyrows)
			{
				scopeProxy.stagePortalCube(
				{
					"Row":
					{
						"Index":cubifyRowIndex
					},
					"Column":
					{
						"Index":cubifyColumnIndex
					}
				});
			}
		}
		else if(crawlDirection === "horizontal")
		{
			if(cubifyRowIndex === -1
			&& cubifyColumnIndex === -1)
			{
				cubifyRowIndex
				= 0;
				cubifyColumnIndex
				= 0;
			}
			else if(cubifyRowIndex >= (totalCubifyrows - 1))
			{
				cubifyRowIndex
				= 0;
				//
				cubifyColumnIndex++;
			}
			else
			{
				cubifyRowIndex++;
			}
			if(cubifyColumnIndex < totalCubifycolumns)
			{
				scopeProxy.stagePortalCube(
				{
					"Row":
					{
						"Index":cubifyRowIndex
					},
					"Column":
					{
						"Index":cubifyColumnIndex
					}
				});
			}
		}
	}
	stagePortalCube(actionParcel)
	{
		let scopeProxy
			= this;
		let rowIndex
			= actionParcel.Row.Index;
		let columnIndex
			= actionParcel.Column.Index;
		let portalcubeLocation
			= "r".concat(rowIndex, "c", columnIndex);
		let portalcubeFocusindex
			= _.has(scopeProxy, "state.Portal.Cubes.Profiles.Reposition.".concat(portalcubeLocation, ".Focus"))
			? scopeProxy.state.Portal.Cubes.Profiles.Reposition[portalcubeLocation].Focus
			: 1;
		let initalCuberotation
			= (portalcubeFocusindex - 1)
			* 90;
		let targetZOffset
			= 200;
		let targetRotateDelta
			= parseInt(scopeProxy.props.Action.Displace);
		//
		let targetcubeId
			= "portalcube-container_".concat(portalcubeLocation);
		let portalcubeFrontId
			= "portalcube-container_".concat(portalcubeLocation, "_front");
		let portalcubeLeftId
			= "portalcube-container_".concat(portalcubeLocation, "_left");
		let portalcubeRightId
			= "portalcube-container_".concat(portalcubeLocation, "_right");
		let portalcubeBackId
			= "portalcube-container_".concat(portalcubeLocation, "_back");
		//
		let targetcubeElement
			= document.getElementById(targetcubeId);
		let portalcubeFrontElement
			= document.getElementById(portalcubeFrontId);
		let portalcubeLeftElement
			= document.getElementById(portalcubeLeftId);
		let portalcubeRightElement
			= document.getElementById(portalcubeRightId);
		let portalcubeBackElement
			= document.getElementById(portalcubeBackId);
		//
		// Task: Determine the forward-facing cube-face for any
		// given rotation displacement for either positive or
		// negative rotation degrees.
		// The use of Math.floor really saves the day here. It
		// allows for a very straight forward way to calulate
		// the face index for any number (or fraction) of cube
		// revolutions, in either the positive or negative direction.
		// Without Math.floor, much more logic to solve for edge
		// cases would be needed. Also note that the face indexes
		// start at 1 not 0 (1,2,3,4 - !0,1,2,3).
		let cubeRevolutions
			= targetRotateDelta / 360;
		let cubeRevolutionsDecimal
			= cubeRevolutions
			- Math.floor(cubeRevolutions);
		let faceTransitions
			= cubeRevolutionsDecimal * 360 / 90;
		let adjustedFaceIndex
			= portalcubeFocusindex
			+ faceTransitions;
		//
		var faceInteger
			= (adjustedFaceIndex > 4)
			? parseInt(adjustedFaceIndex / 4)
			: adjustedFaceIndex;
		var faceDecimal
			= (adjustedFaceIndex > 4)
			? adjustedFaceIndex / 4
			- faceInteger
			: 0;
		var newFaceindex
			= (faceDecimal === 0)
			? faceInteger
			: faceDecimal * 4;
		//
		Object.assign(targetcubeElement.style,
		{
			"zIndex":90000
		});
		Object.assign(portalcubeFrontElement.style,
		{
			"visibility":"visible"
		});
		Object.assign(portalcubeLeftElement.style,
		{
			"visibility":"visible"
		});
		Object.assign(portalcubeRightElement.style,
		{
			"visibility":"visible"
		});
		Object.assign(portalcubeBackElement.style,
		{
			"visibility":"visible"
		});
		let repositionProfile =
			{
				"duration":parseInt(scopeProxy.props.Action.Stage.Duration),
				"easing":scopeProxy.props.Action.Stage.Easing,
				"delay":parseInt(scopeProxy.props.Action.Stage.Delay),
				"runOnMount":false,
				"animation":
				{
					"opacity":1
				},
				"begin":(event)=>
				{
					// empty
				},
				"progress":(elements, complete, remaining, start, tweenValue)=>
				{
					// http://velocityjs.org/
					// The value of tweenValue is being reported as null for
					// unknown reasons. In order to tween the rotation according
					// to the easing, the actual value of the opacity must be
					// used as it tweens from zero to one. Additionally, at the
					// completion of the tween, the value of the opacity is set
					// back to zero by Velocity. This must be avoided so that the
					// rotation of the sections does not revert to its original
					// rotation value.
					//
					let opacityValue
						= (elements[0].style.opacity > 0)
						? elements[0].style.opacity
						: 0;
					let targetZValue
						= targetZOffset * opacityValue;
					let targetRotateValue
						= initalCuberotation
						+ targetRotateDelta * opacityValue;
					let targetelementTransform
						= "translateZ(".concat(targetZValue, "px) rotateY(", targetRotateValue, "deg)");
					let targetElement
						= document.getElementById(targetcubeId);
					//
					Object.assign(targetElement.style,
					{
						"transform":targetelementTransform
					});
				},
				"complete":(event)=>
				{
					let completeProfile =
						{
							"duration":0,
							"easing":"linear",
							"runOnMount":false,
							"animation":
							{
								"opacity":0
							},
							"progress":(elements, complete, remaining, start, tweenValue)=>
							{
								// empty
							},
							"complete":(event)=>
							{
								scopeProxy.resetPortalCube(portalcubeLocation);
							}
						}
					//
					updateState(scopeProxy,
					{
						"Portal":
						{
							"Cubes":
							{
								"Profiles":
								{
									"Reposition":
									{
										"Location":portalcubeLocation,
										[portalcubeLocation]:
										{
											"Profile":completeProfile,
											"Focus":newFaceindex
										}
									}
								}
							},
							"Focus":
							{
								"Row":rowIndex,
								"Column":columnIndex
							}
						}
					});
				}
			}
		//
		if(_.has(scopeProxy, "state.Portal.Cubes.Profiles.Reposition.".concat(portalcubeLocation)) === true)
		{
			Object.assign(scopeProxy.state.Portal.Cubes.Profiles.Reposition[portalcubeLocation],
			{
				"Profile":null
			});
		}
		updateState(scopeProxy,
		{
			"Portal":
			{
				"Cubes":
				{
					"Profiles":
					{
						"Reposition":
						{
							"Location":portalcubeLocation,
							[portalcubeLocation]:
							{
								"Profile":repositionProfile,
								"Rotation":(targetRotateDelta + initalCuberotation)
							}
						}
					}
				}
			},
			"Focus":
			{
				"Row":rowIndex,
				"Column":columnIndex
			}
		});
		scopeProxy.props.Action.Report.Start(
		{
			"Row":rowIndex,
			"Column":columnIndex
		});
	}
	resetPortalCube(portalcubeLocation)
	{
		let scopeProxy
			= this;
		let initialZOffset
			= 200;
		let rowIndex
			= scopeProxy.state.Portal.Focus.Row;
		let columnIndex
			= scopeProxy.state.Portal.Focus.Column;
		let portalcubeRotation
			= _.has(scopeProxy, "state.Portal.Cubes.Profiles.Reposition.".concat(portalcubeLocation, ".Rotation"))
			? scopeProxy.state.Portal.Cubes.Profiles.Reposition[portalcubeLocation].Rotation
			: null;
		let portalcubeFocusindex
			= _.has(scopeProxy, "state.Portal.Cubes.Profiles.Reposition.".concat(portalcubeLocation, ".Focus"))
			? scopeProxy.state.Portal.Cubes.Profiles.Reposition[portalcubeLocation].Focus
			: 1;
		let targetcubeId
			= "portalcube-container_".concat(portalcubeLocation);
		let portalcubeFrontId
			= "portalcube-container_".concat(portalcubeLocation, "_front");
		let portalcubeLeftId
			= "portalcube-container_".concat(portalcubeLocation, "_left");
		let portalcubeRightId
			= "portalcube-container_".concat(portalcubeLocation, "_right");
		let portalcubeBackId
			= "portalcube-container_".concat(portalcubeLocation, "_back");
		//
		let targetcubeElement
			= document.getElementById(targetcubeId);
		let portalcubeFrontElement
			= document.getElementById(portalcubeFrontId);
		let portalcubeLeftElement
			= document.getElementById(portalcubeLeftId);
		let portalcubeRightElement
			= document.getElementById(portalcubeRightId);
		let portalcubeBackElement
			= document.getElementById(portalcubeBackId);
		//
		switch(portalcubeFocusindex)
		{
			case 1:
				var frontfaceVisibility
					= "visible";
				var leftfaceVisibility
					= "hidden";
				var backfaceVisibility
					= "hidden";
				var rightfaceVisibility
					= "hidden";
			break;
			case 2:
				var frontfaceVisibility
					= "hidden";
				var leftfaceVisibility
					= "visible";
				var backfaceVisibility
					= "hidden";
				var rightfaceVisibility
					= "hidden";
			break;
			case 3:
				var frontfaceVisibility
					= "hidden";
				var leftfaceVisibility
					= "hidden";
				var backfaceVisibility
					= "visible";
				var rightfaceVisibility
					= "hidden";
			break;
			case 4:
				var frontfaceVisibility
					= "hidden";
				var leftfaceVisibility
					= "hidden";
				var backfaceVisibility
					= "hidden";
				var rightfaceVisibility
					= "visible";
			break;
		}
		Object.assign(portalcubeFrontElement.style,
		{
			"visibility":frontfaceVisibility
		});
		Object.assign(portalcubeLeftElement.style,
		{
			"visibility":leftfaceVisibility
		});
		Object.assign(portalcubeBackElement.style,
		{
			"visibility":backfaceVisibility
		});
		Object.assign(portalcubeRightElement.style,
		{
			"visibility":rightfaceVisibility
		});
		let resetProfile =
			{
				"duration":parseInt(scopeProxy.props.Action.Reset.Duration),
				"easing":scopeProxy.props.Action.Reset.Easing,
				"delay":parseInt(scopeProxy.props.Action.Reset.Delay),
				"runOnMount":false,
				"animation":
				{
					"opacity":1
				},
				"progress":(elements, complete, remaining, start, tweenValue)=>
				{
					// http://velocityjs.org/
					// The value of tweenValue is being reported as null for
					// unknown reasons. In order to tween the rotation according
					// to the easing, the actual value of the opacity must be
					// used as it tweens from zero to one. Additionally, at the
					// completion of the tween, the value of the opacity is set
					// back to zero by Velocity. This must be avoided so that the
					// rotation of the sections does not revert to its original
					// rotation value.
					//
					let opacityValue
						= (elements[0].style.opacity > 0)
						? elements[0].style.opacity
						: 0;
					let targetElement
						= document.getElementById(targetcubeId);
					let targetZValue
						= initialZOffset * (1 - opacityValue);
					let targetelementTransform
						= "translateZ(".concat(targetZValue, "px) rotateY(", portalcubeRotation, "deg)");
					//
					Object.assign(targetElement.style,
					{
						"transform":targetelementTransform
					});
				},
				"complete":(event)=>
				{
					let completeProfile =
						{
							"duration":0,
							"easing":"linear",
							"runOnMount":false,
							"animation":
							{
								"opacity":0
							},
							"progress":(elements, complete, remaining, start, tweenValue)=>
							{
								// empty
							},
							"complete":(event)=>
							{
								let cubeprogressCount
									= (rowIndex + 1) * (columnIndex + 1);
								let totalPortalcubes
									= scopeProxy.state.Portal.Cubes.Total;
								//
								if(cubeprogressCount === totalPortalcubes)
								{
									updateState(scopeProxy,
									{
										"Active":false,
										"Portal":
										{
											"Focus":
											{
												"Row":-1,
												"Column":-1
											}
										}
									});
									window.requestAnimationFrame(()=>
									{
										scopeProxy.props.Portal.Report.Complete(scopeProxy.props.children);
									});
								}
								scopeProxy.props.Action.Report.Complete(
								{
									"Row":rowIndex,
									"Column":columnIndex
								});
							}
						}
					//
					updateState(scopeProxy,
					{
						"Portal":
						{
							"Cubes":
							{
								"Profiles":
								{
									"Reposition":
									{
										"Location":portalcubeLocation,					
										[portalcubeLocation]:
										{
											"Profile":completeProfile,
											"Focus":portalcubeFocusindex
										}
									}
								}
							}
						},
						"Focus":
						{
							"Row":rowIndex,
							"Column":columnIndex
						}
					});
					Object.assign(targetcubeElement.style,
					{
						"zIndex":10000
					});
				}
			}
		//
		Object.assign(scopeProxy.state.Portal.Cubes.Profiles.Reposition[portalcubeLocation],
		{
			"Profile":null
		});
		updateState(scopeProxy,
		{
			"Portal":
			{
				"Cubes":
				{
					"Profiles":
					{
						"Reposition":
						{
							"Location":portalcubeLocation,
							[portalcubeLocation]:
							{
								"Profile":resetProfile
							}
						}
					}
				},
				"Focus":
				{
					"Row":rowIndex,
					"Column":columnIndex
				},
				"Face":
				{
					"Index":portalcubeFocusindex
				}
			}
		});
		window.requestAnimationFrame(()=>
		{
			scopeProxy.activatePortalCubes();
		});
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			// empty
		}
	//
}