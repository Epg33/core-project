import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import http "http";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";

actor {
  type Pattern = Text.Pattern;
  var postReq = #post"POST";
  var getReq = #get"GET";
  var putReq = #get"PUT";
  type HttpRequest = http.HttpRequest;
  type HttpResponse = http.HttpResponse;
  type Post = {
    id: Nat;
    description: Text;
    voteCount: Nat;
  };

  var posts = Buffer.Buffer<Post>(0);
  public func submit_proposal(req: HttpRequest, desc : Text) : async ?Text {
    let newPost:Post = {
      id = posts.size();
      description = desc;
      voteCount = 0
    };
    switch(req.method) {
      case(postReq) { 
        posts.add(newPost);
        return ?"Post created";
       };
      case(_) { 
        return ?"cant create post";
      };
    };
  };

  public func get_all_proposal() {

  };

  public func get_proposal(req : HttpRequest ,id: Nat ): async ?Post {
    switch(req.method) {
      case(getReq) { 
        let findedPost = posts.get(id);
        return ?findedPost;
       };
    };
  };

  public func vote(req: HttpRequest, id: Nat) : async Text {
    let arr = Buffer.toVarArray(posts);
    switch(req.method) {
      case(putReq) { 
        for(post in arr.vals()){
          
        };

       };
    };
    return "";
  };
};
