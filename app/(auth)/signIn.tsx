
import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { signIn } from '@/lib/appwrite'
import { Link, router } from 'expo-router'

import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'

function SignIn() {
 const [IsSubmitting, setIsSubmitting] = useState(false);
 const [form,setForm] = useState({email:'',password:''});
 const submit = async ()=>{
    if (!form.email || !form.password) return Alert.alert( "Error", 'Please Enter valid email address & password')
    setIsSubmitting(true)
    try{
        await signIn({email: form.email,password:form.password})
        router.push('/(route)');

    }catch(error:any){
        Alert.alert("Error", error.message)
    }finally{
        setIsSubmitting(false);
    }
 }
  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
        < CustomInput  placeholder='Enter your email' 
        value={form.email} 
        onChangeText={(text)=>setForm((prev)=>({...prev, email:text}))} label= "Email" 
        keyboardType='email-address'/>
          < CustomInput  placeholder='Enter your password' 
          value={form.password} 
        onChangeText={(text)=>setForm((prev)=>({...prev, password:text}))} 
        label= "Password" 
    secureTextEntry={true}/>
        <CustomButton title='Sign In'
        isLoading= {IsSubmitting} onPress={submit}/>
        <View className='flex-row justify-center items-center gap-2'> 
            <Text className='base-regular text-gray-100'>Dont have an Account?</Text>
            <Link href= "/signUp" className="base-bold text-primary">Sign up</Link>
        </View>
    </View>
  )
}

export default SignIn