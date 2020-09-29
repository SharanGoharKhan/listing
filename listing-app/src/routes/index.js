import React, { useContext } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { HomeScreens, AccountScreens, AddScreens, SellScreens, ChatScreens } from '../screens'
import { alignment, colors, scale, textStyles } from '../utilities';
import { StyleSheet, Text, View } from 'react-native';
import { SimpleLineIcons, Fontisto, MaterialCommunityIcons, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons'
import { StackOptions, tabIcon, tabOptions, TopBarOptions } from './screenOptions';
import { BackButton, BottomTab } from '../components';
import UserContext from '../context/user';


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
        <AccountTOP.Navigator initialRouteName='Followers' tabBarOptions={TopBarOptions()}>
            <AccountTOP.Screen name='Followers' component={AccountScreens.Followers} />
            <AccountTOP.Screen name='Following' component={AccountScreens.Following} />
        </AccountTOP.Navigator>
    )
}

function AdsTabs() {
    return (
        <AdsTOP.Navigator initialRouteName='Ads' tabBarOptions={TopBarOptions()}>
            <AdsTOP.Screen name='Ads' component={AddScreens.Ads} />
            <AdsTOP.Screen name='Favourite' component={AddScreens.Favourite} />
        </AdsTOP.Navigator>
    )
}

function InboxTabs() {
    return (
        <ChatTOP.Navigator initialRouteName='All'
            tabBarOptions={TopBarOptions()}
        >
            <ChatTOP.Screen name='All' component={ChatScreens.All} />
            <ChatTOP.Screen name='Buying' component={ChatScreens.Buying} />
            <ChatTOP.Screen name='Selling' component={ChatScreens.Selling} />
        </ChatTOP.Navigator>
    )
}

function HomeTabs() {
    return (
        <HomeStack.Navigator initialRouteName='Main' headerMode='screen' screenOptions={StackOptions()}>
            {/* Home Screen */}
            <HomeStack.Screen name='Main' component={HomeScreens.MainHome} />
            <HomeStack.Screen name='Categories' component={HomeScreens.Categories} />
            <HomeStack.Screen name='SubCategories' component={HomeScreens.SubCategories} />
            <HomeStack.Screen name='ProductListing' component={HomeScreens.ProductListing} />
            <HomeStack.Screen name='ProductDescription' component={HomeScreens.ProductDescription} />
            <HomeStack.Screen name='Notifications' component={HomeScreens.Notifications} />
            <HomeStack.Screen name='UserProfile' component={HomeScreens.UserProfile} />
        </HomeStack.Navigator>
    )
}
function ChatTabs({ navigation }) {
    const { isLoggedIn } = useContext(UserContext)

    return (
        <ChatStack.Navigator initialRouteName='MainChat' headerMode='screen' screenOptions={StackOptions()}>
            <ChatStack.Screen name='MainChat' component={InboxTabs} options={{
                title: 'Inbox',
                headerStyle: {
                    backgroundColor: colors.headerbackground,
                },
                headerTitleContainerStyle: {
                    marginLeft: scale(0),
                },
            }} />
            <ChatStack.Screen name='LiveChat' component={ChatScreens.LiveChat} />
        </ChatStack.Navigator>
    )
}

function SellTabs() {
    return (
        <SellStack.Navigator initialRouteName='Home' screenOptions={StackOptions()}>
            <SellStack.Screen name='Home' component={SellScreens.MainSell} />
            <SellStack.Screen name='Categories' component={SellScreens.Categories} options={{ title: 'Choose a category' }} />
            <SellStack.Screen name='SubCategories' component={SellScreens.SubCategories} />
            <SellStack.Screen name='SellingForm' component={SellScreens.SellingFrom} options={{ title: 'Include some details' }} />
        </SellStack.Navigator>
    )
}
function AddTabs() {
    return (
        <AddStack.Navigator initialRouteName='MainAds' screenOptions={StackOptions()}>
            <AddStack.Screen name='MainAds' component={AdsTabs} options={{
                title: 'MY ADS',
                headerStyle: {
                    backgroundColor: colors.headerbackground,
                },
            }} />
        </AddStack.Navigator>
    )
}
function AccountTabs() {
    return (
        <AccountStack.Navigator initialRouteName='MainAccount' headerMode='screen' screenOptions={StackOptions()}>
            <AccountStack.Screen name='MainAccount' component={AccountScreens.MainAccount} options={{ title: 'My Account' }} />
            <AccountStack.Screen name='Help' component={AccountScreens.Help} options={{ title: 'Help and Support' }} />
            <AccountStack.Screen name='Settings' component={AccountScreens.Settings} />
            <AccountStack.Screen name='Profile' component={AccountScreens.Profile} />
            <AccountStack.Screen name='EditProfile' component={AccountScreens.EditProfile} />
            <AccountStack.Screen name='EditPhone' component={AccountScreens.EditPhone} />
            <AccountStack.Screen name='EditEmail' component={AccountScreens.EditEmail} />
            <AccountStack.Screen name='Privacy' component={AccountScreens.Privacy} />
            <AccountStack.Screen name='Notifications' component={AccountScreens.Notifications} />
            <AccountStack.Screen name='Invoices' component={AccountScreens.Invoices} />
            <AccountStack.Screen name='Billing' component={AccountScreens.Billing} />
            <AccountStack.Screen name='BuyPackages' component={AccountScreens.BuyPackages} />
            <AccountStack.Screen name='MyOrders' component={AccountScreens.MyOrders} options={{ title: 'My Orders' }} />
            <AccountStack.Screen name='Categories' component={AccountScreens.Categories} options={{ title: 'Categories' }} />
            <AccountStack.Screen name='SubCategories' component={AccountScreens.SubCategories} />
            <AccountStack.Screen name='Packages' component={AccountScreens.Packages} options={{ title: 'Buy Packages & My Orders' }} />
            <AccountStack.Screen name='Network' component={NetworkTabs} options={{
                headerStyle: {
                    backgroundColor: colors.headerbackground,
                },
            }} />
        </AccountStack.Navigator>
    )
}


function BottomTabs({ navigation }) {
    const { isLoggedIn } = useContext(UserContext)
    return (
        <Tabs.Navigator initialRouteName='Home' backBehavior='history' tabBarOptions={tabOptions()}
            screenOptions={({ route }) => tabIcon(route)}>
            <Tabs.Screen name='Home' component={HomeTabs} />
            <Tabs.Screen name='Chat' component={isLoggedIn ? ChatTabs : AccountScreens.Registration} options={{ tabBarVisible: isLoggedIn ? true : false }} />
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
                <MainStack.Screen name='Registration' component={AccountScreens.Registration} />
                <MainStack.Screen name='ShowPackages' component={AccountScreens.ShowPackages} />
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default AppContainer;