#include <node.h>
#include <v8.h>

using namespace v8;

void NativeRegexTest(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    HandleScope scope(isolate);

    if (args.Length() < 2 || !args[0]->IsRegExp() || !args[1]->IsString()) {
        isolate->ThrowException(
            Exception::TypeError(String::NewFromUtf8Literal(isolate, "Expected (RegExp, string)"))
        );
        return;
    }

    Local<Context> context = isolate->GetCurrentContext();
    Local<RegExp> regex = args[0].As<RegExp>();
    Local<String> input = args[1].As<String>();

    // Execute the regex
    MaybeLocal<Value> result = regex->Exec(context, input);

    // Check if Exec returned a valid match array
    bool matched = false;
    if (!result.IsEmpty()) {
        Local<Value> match = result.ToLocalChecked();
        matched = match->IsArray() && Array::Cast(*match)->Length() > 0;
    }

    args.GetReturnValue().Set(Boolean::New(isolate, matched));
}

void Initialize(Local<Object> exports) {
    NODE_SET_METHOD(exports, "nativeTest", NativeRegexTest);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)


/*#include <node.h>
#include <v8.h>

using namespace v8;

void NativeRegexTest(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    HandleScope scope(isolate);

    if (args.Length() < 2 || !args[0]->IsRegExp() || !args[1]->IsString()) {
        isolate->ThrowException(
            Exception::TypeError(String::NewFromUtf8Literal(isolate, "Expected (RegExp, string)"))
        );
        return;
    }

    Local<RegExp> regex = args[0].As<RegExp>();
    Local<String> input = args[1].As<String>();

    // Exec returns MaybeLocal<Object> now
    MaybeLocal<Object> result = regex->Exec(isolate->GetCurrentContext(), input);

    if (result.IsEmpty()) {
        args.GetReturnValue().Set(false);
    } else {
        args.GetReturnValue().Set(true);
    }
}

void Initialize(Local<Object> exports) {
    NODE_SET_METHOD(exports, "nativeTest", NativeRegexTest);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)*/
