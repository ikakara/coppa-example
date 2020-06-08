// https://snack.expo.io/@wcandillon/progressive-image-loading
import * as React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import ProgressiveImage from "./src-default/components/ProgressiveImage";

export default class App extends React.Component {
  render() {
    const preview1 = require("./assets/images/icon.png");
    const preview =
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABSgAwAEAAAAAQAAAB4AAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAB4AFAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAIDAwMEAwQFBQQGBgYGBggIBwcICA0JCgkKCQ0TDA4MDA4MExEUEQ8RFBEeGBUVGB4jHRwdIyolJSo1MjVFRVz/2wBDAQIDAwMEAwQFBQQGBgYGBggIBwcICA0JCgkKCQ0TDA4MDA4MExEUEQ8RFBEeGBUVGB4jHRwdIyolJSo1MjVFRVz/3QAEAAL/2gAMAwEAAhEDEQA/ALOh3epWNxbXSSfvIriVlJ+VfvBgMDpj1r6O8Wa7a6pYT30FvJay6hCpmhLBj5iP98dtrYr59i09fObaSqsSC2M7Q7fpxXsWp6Hexz2aJbS7PshDDaSQFJ+ckdA3pXv+0Sla+rWhyez0vbRbnIa1qksFzEivL/qlY7QCMsST+tc3/blx/fuPyFbl7FdRzBcRLhRkOw3Cs7bdf3rb/vof4Vt7XzM/ZI//0Ps248J3v2i7iitI2VZIokOQC7AfOWJ5PtXe3Xh69PiOxtHZoEWFVZlkyJt6k7WA6+w6V9Vr4R003EjlQELh1UcYfu3HrUc/hK0l1Jbpjn5QGB6nHfNa4h86jZtNSTua4eSg5XWji0fMl14b0pZTHLps+Y/lBaLcSB0yc1T/AOEc0P8A6Bs3/fj/AOvX2s+m27uWYZJ6nAqP+yrT+7+ldft49jj5H3P/2Q==";
    const uri =
      "https://images.unsplash.com/photo-1455717974081-0436a066bb96?auto=format&fit=crop&w=2730&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";

    return (
      <View style={styles.container}>
        <ProgressiveImage {...{ preview, uri }} style={{ width, height }} />
      </View>
    );
  }
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
});
