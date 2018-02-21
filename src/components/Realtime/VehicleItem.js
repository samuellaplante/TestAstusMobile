import React,{Component,StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native';

class VehicleItem extends Component{
    constructor(props){
        super(props);

        this.state = {
            title       : props.title,
            expanded    : props.expanded,
            animation   : new Animated.Value()
        };
    }

    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }

    render(){
        return (
            <Animated.View 
                style={[styles.container,{height: this.state.animation}]}>
                <TouchableHighlight style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <Text>{this.state.title}</Text>
                </TouchableHighlight>
                
                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>

            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container   : {
        backgroundColor: '#fff'
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold'
    },
    button      : {

    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
});

export default VehicleItem;