import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
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
const AccountTOP = createMaterialTopTabNavigator()
const ChatTOP = createMaterialTopTabNavigator()
const AdsTOP = createMaterialTopTabNavigator()

function NetworkTabs() {
    return (
        <AccountTOP.Navigator initialRouteName='Followers'
            tabBarOptions={{
                activeTintColor: colors.fontMainColor,
                inactiveTintColor: colors.fontSecondColor,
                style: {
                    backgroundColor: colors.headerbackground
                },
                indicatorStyle: {
                    backgroundColor: colors.buttonbackground,
                    height: scale(2)
                }
            }}
        >
            <AccountTOP.Screen name='Followers' component={AccountScreens.Followers} />
            <AccountTOP.Screen name='Following' component={AccountScreens.Following} />
        </AccountTOP.Navigator>
    )
}

function AdsTabs() {
    return (
        <AdsTOP.Navigator initialRouteName='Ads'
            tabBarOptions={{
                activeTintColor: colors.fontMainColor,
                inactiveTintColor: colors.fontSecondColor,
                style: {
                    backgroundColor: colors.headerbackground
                },
                indicatorStyle: {
                    backgroundColor: colors.buttonbackground,
                    height: scale(2)
                }
            }}
        >
            <AdsTOP.Screen name='Ads' component={AddScreens.Ads} />
            <AdsTOP.Screen name='Favourite' component={AddScreens.Favourite} />
        </AdsTOP.Navigator>
    )
}

function InboxTabs() {
    return (
        <ChatTOP.Navigator initialRouteName='All'
            tabBarOptions={{
                activeTintColor: colors.fontMainColor,
                inactiveTintColor: colors.fontSecondColor,
                style: {
                    backgroundColor: colors.headerbackground
                },
                indicatorStyle: {
                    backgroundColor: colors.buttonbackground,
                    height: scale(2)
                }
            }}
        >
            <ChatTOP.Screen name='All' component={ChatScreens.All} />
            <ChatTOP.Screen name='Buying' component={ChatScreens.Buying} />
            <ChatTOP.Screen name='Selling' component={ChatScreens.Selling} />
        </ChatTOP.Navigator>
    )
}

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
        <HomeStack.Navigator initialRouteName='MainChat'>
            <HomeStack.Screen name='MainChat' component={InboxTabs} options={{
                title: 'Inbox',
                headerStyle: {
                    backgroundColor: colors.headerbackground,
                },
            }} />
        </HomeStack.Navigator>
    )
}
function SellTabs() {
    return (
        <HomeStack.Navigator initialRouteName='Home' screenOptions={{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: colors.headerbackground,
                borderBottomColor: colors.horizontalLine,
                borderBottomWidth: StyleSheet.hairlineWidth,
            },
            headerTitleContainerStyle: {
                // backgroundColor: "blue",
                marginLeft: scale(45)
            },
            headerTitleStyle: {
                color: colors.headerText,
                ...textStyles.H3,
                ...textStyles.Bold
            },
            headerBackImage: () =>
                BackButton({ iconColor: colors.headerText, icon: 'leftArrow' }),
        }}>
            <HomeStack.Screen name='Home' component={SellScreens.MainSell} />
            <HomeStack.Screen name='Categories' component={SellScreens.Categories} options={{ title: 'Choose a category' }} />
            <HomeStack.Screen name='SubCategories' component={SellScreens.SubCategories} />
            <HomeStack.Screen name='SellingForm' component={SellScreens.SellingFrom} options={{title:'Include some details'}}/>
        </HomeStack.Navigator>
    )
}
function AddTabs() {
    return (
        <HomeStack.Navigator initialRouteName='MainAds' screenOptions={{
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: colors.headerbackground,
                borderBottomColor: colors.horizontalLine,
                borderBottomWidth: StyleSheet.hairlineWidth,
            },
            headerTitleContainerStyle: {
                // backgroundColor: "blue",
                marginLeft: scale(45)
            },
            headerTitleStyle: {
                color: colors.headerText,
                ...textStyles.H3,
                ...textStyles.Bold
            },
            headerBackImage: () =>
                BackButton({ iconColor: colors.headerText, icon: 'leftArrow' }),
        }}>
            <HomeStack.Screen name='MainAds' component={AdsTabs} options={{
                title: 'MY ADS',
                headerStyle: {
                    backgroundColor: colors.headerbackground,
                },
            }} />
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
                marginLeft: scale(45)
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
            <HomeStack.Screen name='Help' component={AccountScreens.Help} options={{ title: 'Help and Support' }} />
            <HomeStack.Screen name='Packages' component={AccountScreens.Packages} options={{ title: 'Buy Packages & My Orders' }} />
            <HomeStack.Screen name='Settings' component={AccountScreens.Settings} />
            <HomeStack.Screen name='Network' component={NetworkTabs} options={{
                headerStyle: {
                    backgroundColor: colors.headerbackground,
                },
            }} />
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
            <Tabs.Screen name='Add' component={AddTabs} />
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