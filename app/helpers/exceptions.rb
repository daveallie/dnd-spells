module Exceptions
  class SpellCodeCollisionException < StandardError
    def initialize(collision_count)
      super(collision_count.to_s)
    end
  end
end