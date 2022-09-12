from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json
import os
# import jwt, base64
# import urllib.request
import requests

# from python_helper import SettingHelper


# SETTINGS = SettingHelper.getSettingTree('settings.yml')
# API_BASE_URL = SettingHelper.getSetting('api.server.base-url', SETTINGS)
# API_PORT = SettingHelper.getSetting('api.server.port', SETTINGS)
# GOOGLE_OAUTH_AUDIENCE = [SettingHelper.getSetting('google.oauth.client.id', SETTINGS)]
# ALLOWED_ORIGINS = SettingHelper.getSetting('allowed-origins' , SETTINGS)

app = Flask(__name__)
cors = CORS(
    app,
    resources={
        f'/*':{
            'origins': '*'
        }
    },
    supports_credentials=True
)

BASE_URL = 'mobile.data-explore.com'
MOBILE_PORT = '19001'
API_PORT = '19000'


def removePort(json):
    if isinstance(json, dict):
        for k,v in {**json.items()}:
            if isinstance(v, dict):
                return removePort(v)
            elif isinstance(v, str):
                json[k] = v.replace(f':{MOBILE_PORT}', '').replace('\"', '"').replace('\\\\', os.pathsep).replace('%5C', os.pathsep)
    return json


def fix(thing):
    # return thing.replace(f':{MOBILE_PORT}', f':{API_PORT}')
    return thing.replace(f':{MOBILE_PORT}', f'')
    # return thing.replace(f':{MOBILE_PORT}', '').replace('\"', '"').replace('\\\\', os.pathsep).replace('%5C', os.pathsep)


@app.route(f'/', methods=['GET'])
def redirect():
    originalResponse = requests.get(f'http://192.168.0.5:{MOBILE_PORT}', headers=request.headers)
    originalResponseBody = originalResponse.json()
    parsed = fix(originalResponseBody['manifestString'])
    # originalResponseBody['android']['adaptiveIcon']['foregroundImageUrl'] = f'http://{BASE_URL}/assets/./assets/adaptive-icon.png'
    # originalResponseBody['bundleUrl'] = f'http://{BASE_URL}/node_modules%5Cexpo%5CAppEntry.bundle?platform=ios&dev=true&hot=false'
    # originalResponseBody['debuggerHost'] = f'{BASE_URL}'
    # originalResponseBody['hostUri'] = f'{BASE_URL}'
    # originalResponseBody['iconUrl'] = f'http://{BASE_URL}/assets/./assets/icon.png'
    # originalResponseBody['logUrl'] = f'http://{BASE_URL}/logs'
    # originalResponseBody['splash']['imageUrl'] = f'http://{BASE_URL}/assets/./assets/splash.png'
    return Response(
        # json.dumps({
        #     **originalResponseBody
        # }).replace(f':{MOBILE_PORT}', '').replace('\"', '"').replace('\\\\', os.pathsep).replace('%5C', os.pathsep),
        # json.dumps({
        #     **json.loads(originalResponseBody['manifestString'])
        # }),
        parsed,
        headers={
            **originalResponse.headers
        },
        status=200
    )

@app.route(f'/status', methods=['GET'])
def status():
    originalResponse = requests.get(f'http://192.168.0.5:{MOBILE_PORT}/status', headers=request.headers, params=request.args)
    return Response(
        json.dumps({'packager-status':'running'}),
        headers={
            **originalResponse.headers
        },  
        status=200
    )

@app.route(f'/<string:anything>', methods=['GET'])
def anythingElse(anything):
    originalResponse = requests.get(f'http://192.168.0.5:{MOBILE_PORT}/{anything}', headers=request.headers, params=request.args)
    if anything in ['message', f'node_modules{os.pathsep}expo{os.pathsep}AppEntry.bundle', 'ReportServer']:
        return Response(
            originalResponse.content,
            headers={
                **originalResponse.headers
            },  
            status=200
        )
    print(anything)
    originalResponseBody = originalResponse.json()
    return Response(
        fix(json.dumps({
            **originalResponseBody
        })),
        headers={
            **originalResponse.headers
        },  
        status=200
    )

@app.route(f'/<string:anything>/<string:someMore>', methods=['GET'])
def anythingElseAndSomeMore(anything, someMore):
    originalResponse = requests.get(f'http://192.168.0.5:{MOBILE_PORT}/{anything}/{someMore}', headers=request.headers, params=request.args)
    if anything=='inspector' and someMore=='device':
        return Response(
            originalResponse.content,
            headers={
                **originalResponse.headers
            },  
            status=200
        )
    originalResponseBody = originalResponse.json()
    return Response(
        fix(json.dumps({
            **originalResponseBody
        })),
        headers={
            **originalResponse.headers
        },  
        status=200
    )


if __name__ == '__main__':
    app.run(port=API_PORT, host='0.0.0.0')
