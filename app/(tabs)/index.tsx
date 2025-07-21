import { SafeAreaView } from "react-native-safe-area-context";
import "@/app/globals.css";
import { FlatList, Image, Pressable, TouchableOpacity, Text, View, Button } from "react-native";
import { images, offers } from "@/constants";
import cn from "clsx";
import CartButton from "@/components/CartButton";
import * as Sentry from "@sentry/react-native";
import useAuthStore from "@/store/auth.store";

export default function Index() {
  const {user}= useAuthStore();
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven: boolean = index % 2 === 0;
          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: `${item.color}` }}
                android_ripple={{ color: "#ff" }}
              >
                {({ pressed }) => (
                  <>
                    <View className="h-full w-1/2">
                      <Image
                        source={item.image}
                        className="size-full"
                        resizeMode="contain"
                      ></Image>
                    </View>
                    <View
                      className={cn(
                        "offer-card__info",
                        isEven ? "pl-10" : "pr-10"
                      )}
                    >
                      <Text className="h1-bold text-white leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        resizeMode="contain"
                        className="size-10"
                        tintColor="#ffffff"
                      ></Image>
                    </View>
                  </>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={()=>(
        <View className="flex-between flex-row w-full my-5">
        <View className="flex-start">
          <Text className="small-bold text-primary">DELIVER TO</Text>
          <TouchableOpacity className="flex-center flex-row gap-x-2 mt-0.5">
          <Text className="text-dark-100 paragraph-bold ">Lakhimpur</Text>
          <Image source={images.arrowDown} className="size-3" resizeMode="contain"></Image>
          </TouchableOpacity>
        </View>
        <CartButton/>
      </View>
      )}
      ListFooterComponent={()=>(
        <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
      )}
      />
    </SafeAreaView>
  );
}
