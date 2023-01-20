import Http "http";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";

actor {
  public type HttpRequest = Http.HttpRequest;
  public type HttpResponse = Http.HttpResponse;

  stable var currentText : Text = "core project Motoko bootcamp 2023";

  private func update_current_text(desc : ?Text) : () {
    currentText := Option.get(desc, currentText);
  };

  public query func http_request(req : HttpRequest) : async HttpResponse {
    switch (req.method) {
      // case ("POST") {
      //   if (req.body != "") {
      //     update_current_text(Text.decodeUtf8(req.body));
      //     return ({
      //       body = Text.encodeUtf8(currentText);
      //       headers = [];
      //       status_code = 200;
      //       streaming_strategy = null;
      //     });
      //   } else {
      //     return ({
      //       body = Text.encodeUtf8(currentText);
      //       headers = [];
      //       status_code = 200;
      //       streaming_strategy = null;
      //     });
      //   };
      // };
      case ("GET") {
        return ({
          body = Text.encodeUtf8(currentText);
          headers = [];
          status_code = 200;
          streaming_strategy = null;
        });
      };
      case (_) {
        return ({
          body = Text.encodeUtf8(currentText);
          headers = [];
          status_code = 401;
          streaming_strategy = null;
        });
      };
    };

  };
};
