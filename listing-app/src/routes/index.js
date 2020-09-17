import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreens, AccountScreens, AddScreens, SellScreens, ChatScreens } from '../screens'
import { alignment, colors, scale, textStyles } from '../utilities';
import { StyleSheet, Text, View } from 'react-native';
import { SimpleLineIcons, Fontisto, MaterialCommunityIcons, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons'
import { HomeStackOptions, tabIcon, tabOptions } from './screenOptions';
import { BackButton } from '../components';

const Tabs = createBottomTabNavigator()
const MainStack = createStackNavigator()
const HomeStack = createStackNavigator()
const AccountStack = createStackNavigator()
const ChatStack = createStackNavigator()
const AddStack = createStackNavigator()
const SellStack = createStackNavigator()

function HomeTabs() {
    return (
        <HomeStack.Navigator initialRouteName='Main' headerMode='screen'
            screenOptions={HomeStackOptions()}>
            {/* Home Screen */}
            <HomeStack.Screen name='Main' component={HomeScreens.MainHome} />
            <HomeStack.Screen name='Categories' component={HomeScreens.Categories} />
            <HomeStack.Screen name='SubCategories' component={HomeScreens.SubCategories} />
            <HomeStack.Screen name='ProductListing' component={HomeScreens.ProductListing} />
            <HomeStack.Screen name='ProductDescription' component={HomeScreens.ProductDescription} />
            <HomeStack.Screen name='Notifications' component={HomeScreens.Notifications} />
        </HomeStack.Navigator>
    )
}
function ChatTabs() {
    return (
        <HomeStack.Navigator initialRouteName='Home'>
            <HomeStack.Screen name='Home' component={ChatScreens.MainChat} />
        </HomeStack.Navigator>
    )
}
function SellTabs() {
    return (
        <HomeStack.Navigator initialRouteName='Home'>
            <HomeStack.Screen name='Home' component={SellScreens.MainSell} />
        </HomeStack.Navigator>
    )
}
function AddTabs() {
    return (
        <HomeStack.Navigator initialRouteName='Home'>
            <HomeStack.Screen name='Home' component={AddScreens.MainAdd} />
        </HomeStack.Navigator>
    )
}
function AccountTabs() {
    return (
        <HomeStack.Navigator initialRouteName='MainAccount' headerMode='screen' screenOptions={{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: colors.headerbackground,
                borderBottomColor: colors.horizontalLine,
                borderBottomWidth: StyleSheet.hairlineWidth,
            },
            headerTitleContainerStyle: {
                // backgroundColor: "blue",
            },
            headerTitleStyle: {
                color: colors.headerText,
                ...textStyles.H3,
                ...textStyles.Bold
            },
            headerBackImage: () =>
                BackButton({ iconColor: colors.headerText, icon: 'leftArrow' }),
        }}>
            <HomeStack.Screen name='MainAccount' component={AccountScreens.MainAccount} options={{ title: 'My Account' }} />
        </HomeStack.Navigator>
    )
}


function BottomTabs() {
    return (
        <Tabs.Navigator initialRouteName='Home' backBehavior='history' tabBarOptions={tabOptions()}
            screenOptions={({ route }) => tabIcon(route)}>
            <Tabs.Screen name='Home' component={HomeTabs} />
            <Tabs.Screen name='Chat' component={ChatTabs} />
            <Tabs.Screen name='Sell' component={SellTabs} />
            <Tabs.Screen name='Add' component={AddTabs} options={{ title: 'My Adds' }} />
            <Tabs.Screen name='Account' component={AccountTabs} />
        </Tabs.Navigator >
    )
}

function AppContainer() {
    return (
        <NavigationContainer>
            <MainStack.Navigator initialRouteName='BottomTabs' screenOptions={{ headerShown: false }}>
                <MainStack.Screen name='BottomTabs' component={BottomTabs} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default AppContainer;