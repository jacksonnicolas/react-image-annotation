'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _templateObject = _taggedTemplateLiteralLoose(['\n  clear: both;\n  position: relative;\n  width: 100%;\n  &:hover ', ' {\n    opacity: 1;\n  }\n'], ['\n  clear: both;\n  position: relative;\n  width: 100%;\n  &:hover ', ' {\n    opacity: 1;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n  display: block;\n  width: 100%;\n'], ['\n  display: block;\n  width: 100%;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n'], ['\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _compose = require('../utils/compose');

var _compose2 = _interopRequireDefault(_compose);

var _isMouseHovering = require('../utils/isMouseHovering');

var _isMouseHovering2 = _interopRequireDefault(_isMouseHovering);

var _withRelativeMousePos = require('../utils/withRelativeMousePos');

var _withRelativeMousePos2 = _interopRequireDefault(_withRelativeMousePos);

var _defaultProps = require('./defaultProps');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var Container = _styledComponents2.default.div(_templateObject, _Overlay2.default);

var Img = _styledComponents2.default.img(_templateObject2);

var Items = _styledComponents2.default.div(_templateObject3);

var Target = Items;

exports.default = (0, _compose2.default)((0, _isMouseHovering2.default)(), (0, _withRelativeMousePos2.default)())((_temp = _class = function (_Component) {
  _inherits(Annotation, _Component);

  function Annotation(props) {
    _classCallCheck(this, Annotation);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.setInnerRef = function (el) {
      _this.container = el;
      _this.props.relativeMousePos.innerRef(el);
      _this.props.innerRef(el);
    };

    _this.getSelectorByType = function (type) {
      return _this.props.selectors.find(function (s) {
        return s.TYPE === type;
      });
    };

    _this.getSortedAnnotations = function (annotations) {
      var container = _this.container,
          getSelectorByType = _this.getSelectorByType;

      var ordered = annotations.filter(function (a) {
        return !!a;
      }).sort(function (a, b) {
        var aSelector = getSelectorByType(a.geometry.type);
        var bSelector = getSelectorByType(b.geometry.type);

        return -(aSelector.area(a.geometry, container) - bSelector.area(b.geometry, container));
      });
      return ordered;
    };

    _this.getTopAnnotationAt = function (x, y) {
      var annotations = _this.props.annotations;
      var container = _this.container,
          getSelectorByType = _this.getSelectorByType;


      if (!container) return;

      var intersections = annotations.map(function (annotation) {
        var geometry = annotation.geometry;

        var selector = getSelectorByType(geometry.type);

        return selector.intersects({ x: x, y: y }, geometry, container) ? annotation : false;
      }).filter(function (a) {
        return !!a;
      }).sort(function (a, b) {
        var aSelector = getSelectorByType(a.geometry.type);
        var bSelector = getSelectorByType(b.geometry.type);

        return aSelector.area(a.geometry, container) - bSelector.area(b.geometry, container);
      });

      return intersections[0];
    };

    _this.onTargetMouseMove = function (e) {
      _this.props.relativeMousePos.onMouseMove(e);
      _this.onMouseMove(e);
    };

    _this.onTargetMouseLeave = function (e) {
      _this.props.relativeMousePos.onMouseLeave(e);
    };

    _this.onMouseUp = function (e) {
      return _this.callSelectorMethod('onMouseUp', e);
    };

    _this.onMouseDown = function (e) {
      return _this.callSelectorMethod('onMouseDown', e);
    };

    _this.onMouseMove = function (e) {
      return _this.callSelectorMethod('onMouseMove', e);
    };

    _this.onClick = function (e) {
      return _this.callSelectorMethod('onClick', e);
    };

    _this.onCreate = function () {
      if ('onCreate' in _this.props) {
        _this.props.onCreate(_this.props.value);
      } else {
        // deprecate onSubmit for more explicit 'onCreate' name
        _this.props.onSubmit(_this.props.value);
      }
    };

    _this.callSelectorMethod = function (methodName, e) {
      if (_this.props.disableAnnotation) {
        return;
      }
      if (_this.props.ignoreModifier(e)) {
        return;
      }

      if (!!_this.props[methodName]) {
        _this.props[methodName](e);
      } else {
        var selector = _this.getSelectorByType(_this.props.type);
        if (selector && selector.methods[methodName]) {
          var value = selector.methods[methodName](_this.props.value, e);

          if (typeof value === 'undefined') {
            if (process.env.NODE_ENV !== 'production') {
              console.error('\n              ' + methodName + ' of selector type ' + _this.props.type + ' returned undefined.\n              Make sure to explicitly return the previous state\n            ');
            }
          } else {
            _this.props.onChange(value);
          }
        }
      }
    };

    _this.shouldAnnotationBeActive = function (annotation, top) {
      if (_this.props.activeAnnotations) {
        var isActive = !!_this.props.activeAnnotations.find(function (active) {
          return _this.props.activeAnnotationComparator(annotation, active);
        });

        return isActive || top === annotation;
      } else {
        return top === annotation;
      }
    };

    _this.selectAnnotation = function (annotation) {
      if ('onUpdate' in _this.props || 'onDelete' in _this.props) {
        var update = _extends({}, annotation, { selection: _extends({}, annotation.selection, { showEditor: true, isUpdate: true }) });
        _this.props.onChange(update);
      }
    };

    _this.state = {
      showEditor: false
    };
    return _this;
  }

  // Sort by area, largest to smallest
  // using this to get stacking order right for selecting existing
  // annotations


  // Handle selection of existing annotations to support update or delete
  //
  // Check if parent has enabled edit or delete
  // Make the selected annotation current and pop open the editor


  Annotation.prototype.render = function render() {
    var _this2 = this;

    var props = this.props;
    var isMouseHovering = props.isMouseHovering,
        renderEditor = props.renderEditor,
        renderHighlight = props.renderHighlight,
        renderContent = props.renderContent,
        renderSelector = props.renderSelector,
        renderOverlay = props.renderOverlay;


    var topAnnotationAtMouse = this.getTopAnnotationAt(this.props.relativeMousePos.x, this.props.relativeMousePos.y);

    return _react2.default.createElement(
      Container,
      {
        style: props.style,
        innerRef: isMouseHovering.innerRef,
        onMouseLeave: this.onTargetMouseLeave
      },
      _react2.default.createElement(Img, {
        className: props.className,
        style: props.style,
        alt: props.alt,
        src: props.src,
        draggable: false,
        innerRef: this.setInnerRef
      }),
      _react2.default.createElement(
        Items,
        {
          onClick: this.onClick,
          onMouseUp: this.onMouseUp,
          onMouseDown: this.onMouseDown,
          onMouseMove: this.onTargetMouseMove
        },
        this.getSortedAnnotations(props.annotations).map(function (annotation) {
          return renderHighlight({
            key: annotation.data.id,
            annotation: annotation,
            active: _this2.shouldAnnotationBeActive(annotation, topAnnotationAtMouse),
            selectAnnotation: _this2.selectAnnotation
          });
        }),
        !props.disableSelector && props.value && props.value.geometry && renderSelector({
          annotation: props.value
        })
      ),
      !props.disableOverlay && renderOverlay({
        type: props.type,
        annotation: props.value
      }),
      props.annotations.map(function (annotation) {
        return _this2.shouldAnnotationBeActive(annotation, topAnnotationAtMouse) && renderContent({
          key: annotation.data.id,
          annotation: annotation
        });
      }),
      !props.disableEditor && props.value && props.value.selection && props.value.selection.showEditor && renderEditor({
        annotation: props.value,
        onChange: props.onChange,
        onCreate: this.onCreate,
        onUpdate: props.onUpdate,
        onDelete: props.onDelete
      }),
      _react2.default.createElement(
        'div',
        null,
        props.children
      )
    );
  };

  return Annotation;
}(_react.Component), _class.propTypes = {
  innerRef: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func,
  onMouseMove: _propTypes2.default.func,
  onHideEditor: _propTypes2.default.func,
  ignoreModifier: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  children: _propTypes2.default.object,

  annotations: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    type: _propTypes2.default.string
  })).isRequired,
  type: _propTypes2.default.string,
  selectors: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    TYPE: _propTypes2.default.string,
    intersects: _propTypes2.default.func.isRequired,
    area: _propTypes2.default.func.isRequired,
    methods: _propTypes2.default.object.isRequired
  })).isRequired,

  value: _propTypes2.default.shape({
    selection: _propTypes2.default.object,
    geometry: _propTypes2.default.shape({
      type: _propTypes2.default.string.isRequired
    }),
    data: _propTypes2.default.object
  }),
  onChange: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func,
  onCreate: _propTypes2.default.func,
  onUpdate: _propTypes2.default.func,
  onDelete: _propTypes2.default.func,

  activeAnnotationComparator: _propTypes2.default.func,
  activeAnnotations: _propTypes2.default.arrayOf(_propTypes2.default.any),

  disableAnnotation: _propTypes2.default.bool,
  disableSelector: _propTypes2.default.bool,
  renderSelector: _propTypes2.default.func,
  disableEditor: _propTypes2.default.bool,
  renderEditor: _propTypes2.default.func,

  renderHighlight: _propTypes2.default.func.isRequired,
  renderContent: _propTypes2.default.func.isRequired,

  disableOverlay: _propTypes2.default.bool,
  renderOverlay: _propTypes2.default.func.isRequired
}, _class.defaultProps = _defaultProps2.default, _temp));
module.exports = exports['default'];