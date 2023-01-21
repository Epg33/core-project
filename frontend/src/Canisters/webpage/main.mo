import Http "http";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";
import Result "mo:base/Result";

actor {
  public type HttpRequest = Http.HttpRequest;
  public type HttpResponse = Http.HttpResponse;

  stable var currentText : Text = "core project Motoko bootcamp 2023";

  public func update_current_text(desc : Text) : async Result.Result<Text, Text> {
    try {
      currentText := desc;
      return #ok("text changed")
    } catch (e){
      return #err("error");
    };
  };

  public query func http_request(req : HttpRequest) : async HttpResponse {
    switch (req.method) {
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
          body = Text.encodeUtf8("Bad Request");
          headers = [];
          status_code = 401;
          streaming_strategy = null;
        });
      };
    };

  };
};
