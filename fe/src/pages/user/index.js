import Home from "./home";
import ListNft from "./listNft";
import Profile from "./profile";
import ProductDetail from "./productDetali";

export var pageUser = {
  Home: <Home />,
  ListNft: <ListNft />,
  Profile: <Profile />,
  ProductDetail: {
    params: ["id"],
    call: <ProductDetail />,
  },
};
