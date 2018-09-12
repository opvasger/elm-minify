module Main exposing (main)

import Browser exposing (..)
import Html exposing (..)
import Html.Events exposing (..)
import String exposing (..)


type Msg
    = Inc
    | Dec


init =
    0


update msg count =
    case msg of
        Inc ->
            count + 1

        Dec ->
            count - 1


view count =
    div []
        [ button [ onClick Inc ] [ text "+" ]
        , div [] [ text (fromInt count) ]
        , button [ onClick Dec ] [ text "-" ]
        ]


main =
    sandbox
        { init = init
        , update = update
        , view = view
        }
